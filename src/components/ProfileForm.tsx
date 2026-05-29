import type { UserProfile } from '../types';
import type { ReactNode } from 'react';

type Props = {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
};

const activity = ['ほぼ座り仕事', '軽い活動あり', '立ち仕事が多い', 'よく歩く', '肉体労働またはかなり活動的'] as const;

export default function ProfileForm({ profile, onChange }: Props) {
  const set = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => onChange({ ...profile, [key]: value });
  return (
    <div className="space-y-5">
      <Section title="基本情報">
        <Input label="名前またはニックネーム" value={profile.nickname} onChange={(v) => set('nickname', v)} />
        <Select label="性別" value={profile.gender} options={['女性', '男性', 'その他']} onChange={(v) => set('gender', v as UserProfile['gender'])} />
        <Input label="年齢" type="number" value={profile.age} onChange={(v) => set('age', Number(v))} />
        <Input label="身長 cm" type="number" value={profile.heightCm} onChange={(v) => set('heightCm', Number(v))} />
        <Input label="現在体重 kg" type="number" value={profile.currentWeightKg} onChange={(v) => set('currentWeightKg', Number(v))} />
        <Input label="目標体重 kg" type="number" value={profile.targetWeightKg} onChange={(v) => set('targetWeightKg', Number(v))} />
        <Input label="達成したい期間 月数" type="number" value={profile.targetMonths} onChange={(v) => set('targetMonths', Number(v))} />
        <Input label="体脂肪率 任意" type="number" value={profile.bodyFatPercent ?? ''} onChange={(v) => set('bodyFatPercent', v ? Number(v) : undefined)} />
        <Select label="普段の活動量" value={profile.activityLevel} options={[...activity]} onChange={(v) => set('activityLevel', v as UserProfile['activityLevel'])} />
      </Section>
      <Section title="運動情報">
        <Select label="運動経験" value={profile.exerciseExperience} options={['初心者', '中級者', '上級者']} onChange={(v) => set('exerciseExperience', v as UserProfile['exerciseExperience'])} />
        <Input label="週に運動できる回数" type="number" value={profile.exerciseDaysPerWeek} onChange={(v) => set('exerciseDaysPerWeek', Number(v))} />
        <Input label="1回あたり運動できる時間" type="number" value={profile.exerciseMinutes} onChange={(v) => set('exerciseMinutes', Number(v))} />
        <Check label="自宅筋トレ可" checked={profile.canHomeWorkout} onChange={(v) => set('canHomeWorkout', v)} />
        <Check label="ランニング可" checked={profile.canRun} onChange={(v) => set('canRun', v)} />
        <Check label="ウォーキング可" checked={profile.canWalk} onChange={(v) => set('canWalk', v)} />
        <Input label="苦手な運動" value={profile.dislikedExercises} onChange={(v) => set('dislikedExercises', v)} />
        <Input label="不安がある部位" value={profile.painConcerns} onChange={(v) => set('painConcerns', v)} />
      </Section>
      <Section title="食事・生活情報">
        <Input label="1日の食事回数" type="number" value={profile.mealsPerDay} onChange={(v) => set('mealsPerDay', Number(v))} />
        <Check label="朝食を食べる" checked={profile.eatsBreakfast} onChange={(v) => set('eatsBreakfast', v)} />
        {(['eatingOutFrequency', 'convenienceStoreFrequency', 'cookingFrequency', 'snackFrequency', 'alcoholFrequency'] as const).map((key) => (
          <Input key={key} label={{ eatingOutFrequency: '外食頻度', convenienceStoreFrequency: 'コンビニ利用頻度', cookingFrequency: '自炊頻度', snackFrequency: '間食の頻度', alcoholFrequency: 'お酒の頻度' }[key]} value={profile[key]} onChange={(v) => set(key, v)} />
        ))}
        <Input label="好きな食べ物" value={profile.favoriteFoods} onChange={(v) => set('favoriteFoods', v)} />
        <Input label="苦手な食べ物" value={profile.dislikedFoods} onChange={(v) => set('dislikedFoods', v)} />
        <Input label="アレルギー" value={profile.allergies} onChange={(v) => set('allergies', v)} />
        <Input label="避けたい食材" value={profile.avoidedIngredients} onChange={(v) => set('avoidedIngredients', v)} />
        <Select label="食事制限の希望" value={profile.dietPreference} options={['なし', '軽め', 'しっかり', '糖質控えめ', '脂質控えめ', '高たんぱく', '外食中心でも可能なプラン']} onChange={(v) => set('dietPreference', v as UserProfile['dietPreference'])} />
        <Input label="起床時間" type="time" value={profile.wakeTime} onChange={(v) => set('wakeTime', v)} />
        <Input label="就寝時間" type="time" value={profile.sleepTime} onChange={(v) => set('sleepTime', v)} />
        <Input label="睡眠時間" type="number" value={profile.sleepHours} onChange={(v) => set('sleepHours', Number(v))} />
        <Input label="仕事の時間帯" value={profile.workHours} onChange={(v) => set('workHours', v)} />
        <Input label="ストレス度 1-5" type="number" value={profile.stressLevel} onChange={(v) => set('stressLevel', Number(v))} />
        <Input label="休日の過ごし方" value={profile.holidayStyle} onChange={(v) => set('holidayStyle', v)} />
        <label className="md:col-span-2"><span className="mb-1 block text-sm font-semibold">ダイエットで困っていること</span><textarea className="field min-h-24" value={profile.dietTroubles} onChange={(e) => set('dietTroubles', e.target.value)} /></label>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="card"><h2 className="mb-4 text-lg font-bold">{title}</h2><div className="grid gap-3 md:grid-cols-2">{children}</div></section>;
}
function Input({ label, value, onChange, type = 'text' }: { label: string; value: string | number; onChange: (v: string) => void; type?: string }) {
  return <label><span className="mb-1 block text-sm font-semibold">{label}</span><input className="field" type={type} value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}
function Select({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (v: string) => void }) {
  return <label><span className="mb-1 block text-sm font-semibold">{label}</span><select className="field" value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o}>{o}</option>)}</select></label>;
}
function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return <label className="flex items-center gap-2 rounded-xl border border-mint/70 bg-white px-3 py-2 text-sm font-semibold"><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />{label}</label>;
}
