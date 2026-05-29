import type { DietPlan, FoodEntry, FoodItem, MyFood, SavedMeal } from '../types';
import FoodEntryForm from './FoodEntryForm';
import MealSummary from './MealSummary';
import { addNutrition } from '../utils/nutritionCalculator';
import { uid } from '../utils/dateUtils';

type Props = {
  date: string;
  setDate: (date: string) => void;
  entries: FoodEntry[];
  foods: FoodItem[];
  savedMeals: SavedMeal[];
  plan: DietPlan;
  onAdd: (entry: FoodEntry) => void;
  onDelete: (id: string) => void;
  onSaveMyFood: (food: MyFood) => void;
  onSaveMeal: (meal: SavedMeal) => void;
  onAddSavedMeal: (meal: SavedMeal) => void;
};

export default function MealLogger(props: Props) {
  const saveCurrentAsMeal = () => {
    if (!props.entries.length) return;
    const name = window.prompt('メニュー名を入力してください', 'よく食べるセット');
    if (!name) return;
    props.onSaveMeal({
      id: uid('savedmeal'),
      name,
      entries: props.entries.map(({ id: _id, date: _date, mealType: _meal, time: _time, ...rest }) => rest),
      totalNutrition: addNutrition(props.entries.map((e) => e.nutrition)),
      memo: '',
    });
  };

  return (
    <div className="space-y-5">
      <div className="card flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm font-semibold">日付選択<input className="field w-auto" type="date" value={props.date} onChange={(e) => props.setDate(e.target.value)} /></label>
        <button className="btn-secondary" onClick={saveCurrentAsMeal}>今日の記録をメニュー保存</button>
      </div>
      {props.savedMeals.length > 0 && (
        <section className="card">
          <h2 className="mb-3 font-bold">よく食べるメニュー</h2>
          <div className="flex flex-wrap gap-2">
            {props.savedMeals.map((meal) => <button key={meal.id} className="btn-secondary" onClick={() => props.onAddSavedMeal(meal)}>{meal.name} / {meal.totalNutrition.calories}kcal</button>)}
          </div>
        </section>
      )}
      <FoodEntryForm date={props.date} foods={props.foods} onAdd={props.onAdd} onSaveMyFood={props.onSaveMyFood} />
      <MealSummary entries={props.entries} plan={props.plan} onDelete={props.onDelete} />
    </div>
  );
}
