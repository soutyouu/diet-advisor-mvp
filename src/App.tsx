import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ProfileForm from './components/ProfileForm';
import DietPlanView from './components/DietPlanView';
import ExercisePlanView from './components/ExercisePlanView';
import MealLogger from './components/MealLogger';
import MealSuggestion from './components/MealSuggestion';
import WeightTracker from './components/WeightTracker';
import AdviceChat from './components/AdviceChat';
import FoodDatabaseManager from './components/FoodDatabaseManager';
import { foodDatabase } from './data/foodDatabase';
import { calculateDietPlan } from './utils/dietPlanCalculator';
import { defaultState, loadState, saveState } from './utils/localStorage';
import { todayKey, uid } from './utils/dateUtils';
import type { AppState, FoodEntry, MyFood, SavedMeal } from './types';

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [date, setDate] = useState(todayKey());
  const [state, setState] = useState<AppState>(() => typeof window === 'undefined' ? defaultState : loadState());
  const plan = useMemo(() => calculateDietPlan(state.profile), [state.profile]);
  const foods = useMemo(() => [...state.myFoods, ...foodDatabase], [state.myFoods]);
  const entries = state.mealEntries[date] ?? [];

  useEffect(() => saveState(state), [state]);

  const patch = (updater: (current: AppState) => AppState) => setState((current) => updater(current));
  const addMeal = (entry: FoodEntry) => patch((s) => ({ ...s, mealEntries: { ...s.mealEntries, [entry.date]: [...(s.mealEntries[entry.date] ?? []), entry] } }));
  const deleteMeal = (id: string) => patch((s) => ({ ...s, mealEntries: { ...s.mealEntries, [date]: (s.mealEntries[date] ?? []).filter((e) => e.id !== id) } }));
  const saveMyFood = (food: MyFood) => patch((s) => ({ ...s, myFoods: [food, ...s.myFoods.filter((f) => f.name !== food.name)] }));
  const saveMeal = (meal: SavedMeal) => patch((s) => ({ ...s, savedMeals: [meal, ...s.savedMeals] }));
  const addSavedMeal = (meal: SavedMeal) => {
    const now = new Date().toTimeString().slice(0, 5);
    meal.entries.forEach((entry) => addMeal({ ...entry, id: uid('meal'), date, mealType: '朝食', time: now }));
  };
  const toggleExercise = (id: string) => patch((s) => {
    const key = todayKey();
    const current = s.completedExercises[key] ?? [];
    return { ...s, completedExercises: { ...s.completedExercises, [key]: current.includes(id) ? current.filter((x) => x !== id) : [...current, id] } };
  });

  return (
    <Layout active={active} onChange={setActive}>
      {active === 'dashboard' && <Dashboard state={state} plan={plan} />}
      {active === 'profile' && <ProfileForm profile={state.profile} onChange={(profile) => patch((s) => ({ ...s, profile }))} />}
      {active === 'plan' && <DietPlanView plan={plan} />}
      {active === 'exercise' && <ExercisePlanView profile={state.profile} completed={state.completedExercises} onToggle={toggleExercise} />}
      {active === 'meals' && <MealLogger date={date} setDate={setDate} entries={entries} foods={foods} savedMeals={state.savedMeals} plan={plan} onAdd={addMeal} onDelete={deleteMeal} onSaveMyFood={saveMyFood} onSaveMeal={saveMeal} onAddSavedMeal={addSavedMeal} />}
      {active === 'suggestion' && <MealSuggestion plan={plan} profile={state.profile} />}
      {active === 'weight' && <WeightTracker profile={state.profile} records={state.weightRecords} onAdd={(record) => patch((s) => ({ ...s, weightRecords: [...s.weightRecords.filter((r) => r.date !== record.date), record] }))} />}
      {active === 'advice' && <AdviceChat history={state.adviceHistory} onAdd={(item) => patch((s) => ({ ...s, adviceHistory: [...s.adviceHistory, item] }))} />}
      {active === 'database' && <FoodDatabaseManager foods={foodDatabase} myFoods={state.myFoods} onDeleteMyFood={(id) => patch((s) => ({ ...s, myFoods: s.myFoods.filter((f) => f.id !== id) }))} />}
      {active === 'settings' && (
        <section className="card space-y-4">
          <h2 className="text-lg font-bold">設定</h2>
          <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={state.settings.notifications} onChange={(e) => patch((s) => ({ ...s, settings: { ...s.settings, notifications: e.target.checked } }))} />記録リマインダーを使う</label>
          <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={state.settings.showHealthNotice} onChange={(e) => patch((s) => ({ ...s, settings: { ...s.settings, showHealthNotice: e.target.checked } }))} />注意表示を表示する</label>
          {state.settings.showHealthNotice && <p className="rounded-2xl bg-blush/45 p-4 text-sm leading-relaxed">このアプリは健康管理・ダイエット補助を目的としたものであり、医療行為ではありません。持病がある方、妊娠中の方、摂食障害の経験がある方、BMIが低い方、体調に不安がある方は、医師や管理栄養士に相談してください。極端な食事制限や過度な運動は推奨しません。</p>}
          <button className="btn-secondary" onClick={() => { if (window.confirm('LocalStorageの保存データを初期化しますか？')) setState(defaultState); }}>保存データを初期化</button>
        </section>
      )}
    </Layout>
  );
}
