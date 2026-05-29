import type { FoodItem, MyFood } from '../types';
import type { ReactNode } from 'react';

export default function FoodDatabaseManager({ foods, myFoods, onDeleteMyFood }: { foods: FoodItem[]; myFoods: MyFood[]; onDeleteMyFood: (id: string) => void }) {
  return (
    <div className="space-y-5">
      <section className="card">
        <h2 className="mb-3 text-lg font-bold">マイ食品</h2>
        {myFoods.length ? <div className="grid gap-3 md:grid-cols-2">{myFoods.map((f) => <FoodCard key={f.id} food={f} action={<button className="text-xs font-bold text-rose-500" onClick={() => onDeleteMyFood(f.id)}>削除</button>} />)}</div> : <p className="text-sm text-ink/70">食事記録画面で手動入力した食品を保存できます。</p>}
      </section>
      <section className="card">
        <h2 className="mb-3 text-lg font-bold">食品データベース</h2>
        <p className="mb-3 text-sm text-ink/70">基準量ごとの一般的な目安値です。将来はこのファイルを食品APIや画像認識の結果に差し替えられます。</p>
        <div className="grid max-h-[620px] gap-3 overflow-auto md:grid-cols-2 xl:grid-cols-3">
          {foods.map((food) => <FoodCard key={food.id} food={food} />)}
        </div>
      </section>
    </div>
  );
}

function FoodCard({ food, action }: { food: FoodItem; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-mint/50 bg-white/75 p-3 text-sm">
      <div className="flex items-start justify-between gap-2"><strong>{food.name}</strong>{action}</div>
      <p className="text-xs text-ink/60">{food.category} / {food.baseAmount}{food.unit}</p>
      <p className="mt-2">{food.nutrition.calories}kcal P{food.nutrition.protein} F{food.nutrition.fat} C{food.nutrition.carbs}</p>
    </div>
  );
}
