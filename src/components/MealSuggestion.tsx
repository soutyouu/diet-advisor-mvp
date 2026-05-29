import type { DietPlan, UserProfile } from '../types';

const patterns = ['自炊中心', 'コンビニ中心', '外食中心', '忙しい人向け', '高たんぱく', '脂質控えめ', '糖質控えめ', '運動する日向け', '運動しない日向け'];

export default function MealSuggestion({ plan, profile }: { plan: DietPlan; profile: UserProfile }) {
  return (
    <div className="space-y-5">
      <div className="card">
        <h2 className="mb-2 text-lg font-bold">食事提案</h2>
        <p className="text-sm text-ink/70">目標 {plan.recommendedCalories}kcal / P{plan.proteinTarget}g / F{plan.fatTarget}g / C{plan.carbTarget}g に合わせた例です。</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        {patterns.map((pattern) => <SuggestionCard key={pattern} pattern={pattern} plan={plan} profile={profile} />)}
      </div>
    </div>
  );
}

function SuggestionCard({ pattern, plan, profile }: { pattern: string; plan: DietPlan; profile: UserProfile }) {
  const highProtein = pattern.includes('高たんぱく') || profile.dietPreference === '高たんぱく';
  const convenience = pattern.includes('コンビニ') || profile.convenienceStoreFrequency.includes('多');
  const menu = convenience
    ? {
      breakfast: ['コンビニおにぎり 1個', 'ゆで卵 1個', '味噌汁 1杯'],
      lunch: ['サラダチキン 1パック', 'コンビニサラダ', '玄米おにぎり 1個'],
      dinner: ['コンビニスープ', '豆腐', '白米 少なめ'],
      snack: ['プロテイン', 'ギリシャヨーグルト'],
    }
    : {
      breakfast: ['オートミール 40g', 'ギリシャヨーグルト', 'バナナ半分'],
      lunch: ['鶏むね肉 150g', '玄米 150g', 'ブロッコリー', '味噌汁'],
      dinner: ['鮭', '豆腐', '野菜スープ', '白米少なめ'],
      snack: highProtein ? ['プロテイン', 'ゆで卵'] : ['果物', 'ナッツ少量'],
    };
  return (
    <article className="card">
      <h3 className="text-lg font-bold">{pattern}</h3>
      <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
        <Meal title="朝食案" items={menu.breakfast} />
        <Meal title="昼食案" items={menu.lunch} />
        <Meal title="夕食案" items={menu.dinner} />
        <Meal title="間食案" items={menu.snack} />
      </div>
      <div className="mt-3 rounded-xl bg-mint/20 p-3 text-sm">目安: {Math.round(plan.recommendedCalories * 0.95)}kcal / P{Math.round(plan.proteinTarget)}g / F{Math.round(plan.fatTarget)}g / C{Math.round(plan.carbTarget)}g</div>
      <p className="mt-3 text-sm">おすすめ理由: たんぱく質を各食に分け、空腹と筋肉量の低下を防ぎやすい構成です。</p>
      <p className="mt-1 text-sm text-ink/70">注意点: 調味料、ドレッシング、飲み物のカロリーも記録しましょう。</p>
    </article>
  );
}
function Meal({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-xl bg-white/70 p-3"><p className="font-bold">{title}</p><ul>{items.map((i) => <li key={i}>・{i}</li>)}</ul></div>;
}
