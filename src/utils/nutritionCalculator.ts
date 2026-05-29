import type { FoodEntry, Nutrition } from '../types';

export const zeroNutrition = (): Nutrition => ({
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
  sugar: 0,
  fiber: 0,
  salt: 0,
});

export const roundNutrition = (n: Nutrition): Nutrition => ({
  calories: Math.round(n.calories),
  protein: Math.round(n.protein * 10) / 10,
  fat: Math.round(n.fat * 10) / 10,
  carbs: Math.round(n.carbs * 10) / 10,
  sugar: Math.round(n.sugar * 10) / 10,
  fiber: Math.round(n.fiber * 10) / 10,
  salt: Math.round(n.salt * 10) / 10,
});

export const addNutrition = (items: Nutrition[]) =>
  roundNutrition(items.reduce<Nutrition>((sum, n) => ({
    calories: sum.calories + n.calories,
    protein: sum.protein + n.protein,
    fat: sum.fat + n.fat,
    carbs: sum.carbs + n.carbs,
    sugar: sum.sugar + n.sugar,
    fiber: sum.fiber + n.fiber,
    salt: sum.salt + n.salt,
  }), zeroNutrition()));

export const totalEntries = (entries: FoodEntry[]) => addNutrition(entries.map((e) => e.nutrition));
