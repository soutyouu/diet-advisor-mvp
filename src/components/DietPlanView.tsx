import type { DietPlan } from '../types';
import CharacterCoach from './CharacterCoach';

export default function DietPlanView({ plan }: { plan: DietPlan }) {
  const items = [
    ['総減量', `${plan.totalLossKg}kg`],
    ['1ヶ月あたり', `${plan.monthlyLossKg}kg`],
    ['1週間あたり', `${plan.weeklyLossKg}kg`],
    ['1日あたり赤字', `${plan.dailyDeficitKcal}kcal`],
    ['BMI', `${plan.bmi}`],
    ['目標BMI', `${plan.targetBmi}`],
    ['BMR', `${plan.bmr}kcal`],
    ['TDEE', `${plan.tdee}kcal`],
    ['推奨摂取', `${plan.recommendedCalories}kcal`],
    ['たんぱく質', `${plan.proteinTarget}g`],
    ['脂質', `${plan.fatTarget}g`],
    ['炭水化物', `${plan.carbTarget}g`],
  ];
  return (
    <div className="space-y-5">
      <CharacterCoach message={plan.warning ?? `今回のペースは「${plan.paceLabel}」です。体調と睡眠を見ながら、無理なく進めましょう。`} />
      <div className="card">
        <h2 className="mb-4 text-lg font-bold">減量プラン</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {items.map(([label, value]) => <div key={label} className="rounded-xl bg-mint/20 p-3"><p className="text-xs font-semibold text-leaf">{label}</p><p className="text-xl font-bold">{value}</p></div>)}
        </div>
      </div>
      <div className="card bg-blush/45 text-sm leading-relaxed">
        このアプリは健康管理・ダイエット補助を目的としたものであり、医療行為ではありません。持病がある方、妊娠中の方、摂食障害の経験がある方、BMIが低い方、体調に不安がある方は、医師や管理栄養士に相談してください。極端な食事制限や過度な運動は推奨しません。
      </div>
    </div>
  );
}
