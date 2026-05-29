import type { FoodItem, Nutrition } from '../types';
import { roundNutrition } from './nutritionCalculator';

export const calculateFoodNutrition = (food: FoodItem, amount: number, quantity = 1): Nutrition => {
  const ratio = food.baseAmount > 0 ? (amount * quantity) / food.baseAmount : quantity;
  return roundNutrition({
    calories: food.nutrition.calories * ratio,
    protein: food.nutrition.protein * ratio,
    fat: food.nutrition.fat * ratio,
    carbs: food.nutrition.carbs * ratio,
    sugar: food.nutrition.sugar * ratio,
    fiber: food.nutrition.fiber * ratio,
    salt: food.nutrition.salt * ratio,
  });
};

export const searchFoods = (foods: FoodItem[], keyword: string) => {
  const q = keyword.trim().toLowerCase();
  if (!q) return foods.slice(0, 8);
  return foods
    .filter((f) => [f.name, ...(f.aliases ?? [])].some((text) => text.toLowerCase().includes(q)))
    .slice(0, 10);
};
