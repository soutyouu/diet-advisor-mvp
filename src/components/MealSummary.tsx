import type { DietPlan, FoodEntry, MealType } from '../types';
import { mealTypes } from '../data/foodDatabase';
import { totalEntries } from '../utils/nutritionCalculator';

export default function MealSummary({ entries, plan, onDelete }: { entries: FoodEntry[]; plan: DietPlan; onDelete: (id: string) => void }) {
  const total = totalEntries(entries);
  const groups = mealTypes.map((meal) => [meal, entries.filter((e) => e.mealType === meal)] as const).filter(([, list]) => list.length);
  const comments = [
    total.calories <= plan.recommendedCalories ? 'カロリーは良い範囲です。' : '脂質や間食、飲み物のカロリーを少し確認しましょう。',
    total.protein >= plan.proteinTarget ? '今日はたんぱく質がしっかり取れています。' : 'たんぱく質が少なめです。卵・鶏むね肉・魚・豆腐などを足すと良いですね。',
    total.fat > plan.fatTarget * 1.2 ? '脂質がやや多めです。揚げ物やお菓子を少し減らすと良いです。' : '脂質は大きく崩れていません。',
    total.fiber < 18 ? '食物繊維が少なめです。野菜・海藻・きのこを足しましょう。' : '食物繊維も意識できています。',
    total.salt > 7 ? '塩分が多めです。汁物の飲み干しや加工食品を調整しましょう。' : '塩分は控えめにできています。',
  ];

  return (
    <section className="card">
      <h2 className="mb-4 text-lg font-bold">食事記録の表示</h2>
      <div className="grid gap-2 rounded-2xl bg-mint/20 p-3 text-sm md:grid-cols-4">
        <strong>{total.calories}kcal</strong>
        <span>P {total.protein}g / 目標{plan.proteinTarget}g</span>
        <span>F {total.fat}g / 目標{plan.fatTarget}g</span>
        <span>C {total.carbs}g / 目標{plan.carbTarget}g</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-leaf">目標摂取カロリーとの差分: {total.calories - plan.recommendedCalories}kcal</p>
      <div className="mt-4 space-y-4">
        {groups.map(([meal, list]) => <MealGroup key={meal} meal={meal} entries={list} onDelete={onDelete} />)}
      </div>
      <div className="mt-4 rounded-2xl bg-lemon/40 p-3">
        <h3 className="mb-2 font-bold">食事評価</h3>
        <ul className="space-y-1 text-sm">{comments.map((c) => <li key={c}>・{c}</li>)}</ul>
      </div>
    </section>
  );
}

function MealGroup({ meal, entries, onDelete }: { meal: MealType; entries: FoodEntry[]; onDelete: (id: string) => void }) {
  const total = totalEntries(entries);
  return (
    <div className="rounded-2xl border border-mint/50 p-3">
      <div className="mb-2 flex justify-between"><h3 className="font-bold">{meal}</h3><span className="text-sm">{total.calories}kcal</span></div>
      <div className="space-y-2">
        {entries.map((e) => (
          <div key={e.id} className="flex items-center justify-between gap-2 rounded-xl bg-white/75 p-2 text-sm">
            <span>{e.time} {e.foodName} {e.amount}{e.unit} x{e.quantity}</span>
            <button className="text-xs font-bold text-rose-500" onClick={() => onDelete(e.id)}>削除</button>
          </div>
        ))}
      </div>
    </div>
  );
}
