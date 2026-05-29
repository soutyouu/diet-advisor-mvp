import type { AppState, DietPlan } from '../types';
import CharacterCoach from './CharacterCoach';
import ProgressChart from './ProgressChart';
import { totalEntries } from '../utils/nutritionCalculator';
import { todayKey } from '../utils/dateUtils';

export default function Dashboard({ state, plan }: { state: AppState; plan: DietPlan }) {
  const today = todayKey();
  const meals = state.mealEntries[today] ?? [];
  const total = totalEntries(meals);
  const latestWeight = [...state.weightRecords].sort((a, b) => b.date.localeCompare(a.date))[0]?.weightKg ?? state.profile.currentWeightKg;
  const remaining = Math.max(0, latestWeight - state.profile.targetWeightKg);
  const pfcTotal = total.protein + total.fat + total.carbs;
  const pfc = pfcTotal ? [
    ['P', total.protein, '#77b27d'],
    ['F', total.fat, '#ffb873'],
    ['C', total.carbs, '#ffdf72'],
  ] as const : [];
  const coach = meals.length === 0
    ? 'まずは今日食べたものを1つだけ記録してみましょう。小さく始めるのが一番強いです。'
    : total.calories <= plan.recommendedCalories && total.protein >= plan.proteinTarget * 0.8
      ? '今日は良いペースです！たんぱく質も意識できています。この調子でいきましょう。'
      : total.calories > plan.recommendedCalories
        ? '少しオーバーしていますが、明日の食事と運動で調整できます。責めずに記録を続けましょう。'
        : 'たんぱく質が少なめです。夕食に魚や豆腐、卵を足すのがおすすめです。';
  const todayExercise = Object.values(state.completedExercises[today] ?? {}).length;

  return (
    <div className="space-y-5">
      <CharacterCoach message={coach} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric title="今日の体重" value={`${latestWeight}kg`} />
        <Metric title="目標体重" value={`${state.profile.targetWeightKg}kg`} />
        <Metric title="目標まで" value={`あと${remaining.toFixed(1)}kg`} />
        <Metric title="今日の摂取" value={`${total.calories} / ${plan.recommendedCalories}kcal`} />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="card">
          <h2 className="mb-3 font-bold">体重推移</h2>
          <ProgressChart records={state.weightRecords} />
        </section>
        <section className="card">
          <h2 className="mb-3 font-bold">PFCバランス</h2>
          <div className="space-y-3">
            {pfc.length ? pfc.map(([label, value, color]) => (
              <div key={label}>
                <div className="mb-1 flex justify-between text-sm"><span>{label}</span><span>{value.toFixed(1)}g</span></div>
                <div className="h-3 rounded-full bg-mint/20"><div className="h-3 rounded-full" style={{ width: `${Math.min(100, (value / pfcTotal) * 100)}%`, background: color }} /></div>
              </div>
            )) : <p className="text-sm text-ink/70">食事を記録すると表示されます。</p>}
          </div>
        </section>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Metric title="今日の消費予定カロリー" value={`${Math.round(plan.tdee - plan.bmr + 180)}kcal`} />
        <Metric title="今日の運動メニュー" value={todayExercise ? `${todayExercise}件完了済み` : '運動画面で確認'} />
      </div>
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return <div className="card"><p className="text-xs font-semibold text-leaf">{title}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}
