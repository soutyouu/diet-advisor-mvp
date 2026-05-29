import type { FoodItem } from '../types';
import { searchFoods } from '../utils/calorieCalculator';

type Props = {
  foods: FoodItem[];
  value: string;
  onChange: (value: string) => void;
  onSelect: (food: FoodItem) => void;
};

export default function FoodSearchInput({ foods, value, onChange, onSelect }: Props) {
  const suggestions = searchFoods(foods, value);
  return (
    <div className="relative">
      <input className="field" placeholder="例: ごは、鶏むね、プロ..." value={value} onChange={(e) => onChange(e.target.value)} />
      {value && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-mint bg-white p-1 shadow-soft">
          {suggestions.map((food) => (
            <button key={food.id} type="button" onClick={() => onSelect(food)} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-mint/25">
              <span className="font-semibold">{food.name}</span>
              <span className="ml-2 text-xs text-ink/60">{food.baseAmount}{food.unit} / {food.nutrition.calories}kcal</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
