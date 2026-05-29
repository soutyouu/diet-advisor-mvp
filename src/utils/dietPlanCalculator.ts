import type { ActivityLevel, DietPlan, UserProfile } from '../types';

const activityFactors: Record<ActivityLevel, number> = {
  ほぼ座り仕事: 1.2,
  軽い活動あり: 1.375,
  立ち仕事が多い: 1.55,
  よく歩く: 1.65,
  肉体労働またはかなり活動的: 1.8,
};

export const calculateDietPlan = (profile: UserProfile): DietPlan => {
  const heightM = profile.heightCm / 100;
  const totalLossKg = Math.max(0, profile.currentWeightKg - profile.targetWeightKg);
  const monthlyLossKg = totalLossKg / Math.max(profile.targetMonths, 1);
  const weeklyLossKg = monthlyLossKg / 4.345;
  const dailyDeficitKcal = (totalLossKg * 7200) / Math.max(profile.targetMonths * 30, 1);
  const sexOffset = profile.gender === '男性' ? 5 : profile.gender === '女性' ? -161 : -78;
  const bmr = 10 * profile.currentWeightKg + 6.25 * profile.heightCm - 5 * profile.age + sexOffset;
  const tdee = bmr * activityFactors[profile.activityLevel];
  const recommendedCalories = Math.max(1200, tdee - dailyDeficitKcal);
  const proteinTarget = profile.targetWeightKg * 1.8;
  const fatTarget = (recommendedCalories * 0.25) / 9;
  const carbTarget = (recommendedCalories - proteinTarget * 4 - fatTarget * 9) / 4;
  const monthlyPercent = (monthlyLossKg / Math.max(profile.currentWeightKg, 1)) * 100;
  const paceLabel = monthlyPercent < 3 ? 'ゆるやか' : monthlyPercent < 5 ? '標準' : monthlyPercent < 8 ? 'ややハード' : '危険';

  return {
    totalLossKg: round(totalLossKg),
    monthlyLossKg: round(monthlyLossKg),
    weeklyLossKg: round(weeklyLossKg),
    dailyDeficitKcal: Math.round(dailyDeficitKcal),
    bmi: round(profile.currentWeightKg / (heightM * heightM)),
    targetBmi: round(profile.targetWeightKg / (heightM * heightM)),
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    recommendedCalories: Math.round(recommendedCalories),
    proteinTarget: Math.round(proteinTarget),
    fatTarget: Math.round(fatTarget),
    carbTarget: Math.max(0, Math.round(carbTarget)),
    paceLabel,
    warning: paceLabel === '危険'
      ? 'このペースは健康リスクが高い可能性があります。期間を伸ばすか、目標体重を見直してください。'
      : undefined,
  };
};

const round = (value: number) => Math.round(value * 10) / 10;
