import { useMemo, useState } from 'react';
import type { CookingMethod, FoodCategory, FoodEntry, FoodItem, MealType, MyFood, Nutrition, Unit } from '../types';
import { calculateFoodNutrition } from '../utils/calorieCalculator';
import { zeroNutrition } from '../utils/nutritionCalculator';
import { cookingMethods, foodCategories, mealTypes, units } from '../data/foodDatabase';
import { todayKey, uid } from '../utils/dateUtils';
import FoodSearchInput from './FoodSearchInput';

type Props = {
  date: string;
  foods: FoodItem[];
  onAdd: (entry: FoodEntry) => void;
  onSaveMyFood: (food: MyFood) => void;
};

export default function FoodEntryForm({ date, foods, onAdd, onSaveMyFood }: Props) {
  const [selected, setSelected] = useState<FoodItem | undefined>();
  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState<FoodCategory>('主食');
  const [mealType, setMealType] = useState<MealType>('朝食');
  const [time, setTime] = useState('08:00');
  const [amount, setAmount] = useState(100);
  const [unit, setUnit] = useState<Unit>('g');
  const [quantity, setQuantity] = useState(1);
  const [cookingMethod, setCookingMethod] = useState<CookingMethod>('不明');
  const [memo, setMemo] = useState('');
  const [manual, setManual] = useState<Nutrition>(zeroNutrition());

  const calculated = useMemo(() => selected ? calculateFoodNutrition(selected, amount, quantity) : manual, [selected, amount, quantity, manual]);

  const selectFood = (food: FoodItem) => {
    setSelected(food);
    setFoodName(food.name);
    setCategory(food.category);
    setAmount(food.baseAmount);
    setUnit(food.unit);
  };

  const addEntry = () => {
    if (!foodName.trim()) return;
    onAdd({
      id: uid('meal'),
      date,
      mealType,
      time,
      foodName,
      category,
      amount,
      unit,
      quantity,
      cookingMethod,
      memo,
      nutrition: calculated,
      sourceFoodId: selected?.id,
    });
    setFoodName('');
    setSelected(undefined);
    setMemo('');
  };

  const saveMyFood = () => {
    if (!foodName.trim()) return;
    onSaveMyFood({
      id: uid('myfood'),
      name: foodName,
      category,
      baseAmount: amount,
      unit,
      nutrition: calculated,
      memo,
      createdAt: todayKey(),
    });
  };

  return (
    <section className="card">
      <h2 className="mb-4 text-lg font-bold">食事を記録</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="md:col-span-2"><span className="mb-1 block text-sm font-semibold">食品名</span><FoodSearchInput foods={foods} value={foodName} onChange={(v) => { setFoodName(v); setSelected(undefined); }} onSelect={selectFood} /></label>
        <Select label="食事タイミング" value={mealType} options={mealTypes} onChange={(v) => setMealType(v as MealType)} />
        <Input label="食べた時刻" type="time" value={time} onChange={setTime} />
        <Select label="食品カテゴリ" value={category} options={foodCategories} onChange={(v) => setCategory(v as FoodCategory)} />
        <Select label="調理方法" value={cookingMethod} options={cookingMethods} onChange={(v) => setCookingMethod(v as CookingMethod)} />
        <Input label="量" type="number" value={amount} onChange={(v) => setAmount(Number(v))} />
        <Select label="単位" value={unit} options={units} onChange={(v) => setUnit(v as Unit)} />
        <Input label="個数" type="number" value={quantity} onChange={(v) => setQuantity(Number(v))} />
        <Input label="メモ" value={memo} onChange={setMemo} />
      </div>
      {!selected && (
        <div className="mt-4 rounded-2xl bg-lemon/40 p-3">
          <p className="mb-2 text-sm font-bold">データベースにない食品は手動入力できます</p>
          <div className="grid gap-2 md:grid-cols-4">
            {(['calories', 'protein', 'fat', 'carbs', 'sugar', 'fiber', 'salt'] as const).map((key) => (
              <Input key={key} label={{ calories: 'kcal', protein: 'P', fat: 'F', carbs: 'C', sugar: '糖質', fiber: '食物繊維', salt: '塩分' }[key]} type="number" value={manual[key]} onChange={(v) => setManual({ ...manual, [key]: Number(v) })} />
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 grid gap-2 rounded-2xl bg-mint/20 p-3 text-sm sm:grid-cols-4">
        <strong>{calculated.calories}kcal</strong><span>P {calculated.protein}g</span><span>F {calculated.fat}g</span><span>C {calculated.carbs}g</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn" type="button" onClick={addEntry}>記録する</button>
        <button className="btn-secondary" type="button" onClick={saveMyFood}>マイ食品に保存</button>
      </div>
    </section>
  );
}

function Input({ label, value, onChange, type = 'text' }: { label: string; value: string | number; onChange: (v: string) => void; type?: string }) {
  return <label><span className="mb-1 block text-sm font-semibold">{label}</span><input className="field" type={type} value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}
function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (v: string) => void }) {
  return <label><span className="mb-1 block text-sm font-semibold">{label}</span><select className="field" value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o}>{o}</option>)}</select></label>;
}
