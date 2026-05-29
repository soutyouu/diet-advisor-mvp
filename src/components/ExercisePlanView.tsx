import type { ExerciseItem, UserProfile } from '../types';
import CharacterCoach from './CharacterCoach';
import { generateExercisePlan } from '../data/exerciseTemplates';
import { todayKey } from '../utils/dateUtils';

type Props = {
  profile: UserProfile;
  completed: Record<string, string[]>;
  onToggle: (itemId: string) => void;
};

export default function ExercisePlanView({ profile, completed, onToggle }: Props) {
  const plan = generateExercisePlan(profile);
  const done = completed[todayKey()] ?? [];
  return (
    <div className="space-y-5">
      <CharacterCoach message={done.length ? '運動を継続できて素晴らしいです！小さな積み重ねが体調を変えていきます。' : '今日はできる範囲で大丈夫です。10分だけでも十分に価値があります。'} />
      <div className="grid gap-4 xl:grid-cols-2">
        {plan.map((item) => <ExerciseCard key={item.id} item={item} checked={done.includes(item.id)} onToggle={() => onToggle(item.id)} />)}
      </div>
    </div>
  );
}

function ExerciseCard({ item, checked, onToggle }: { item: ExerciseItem; checked: boolean; onToggle: () => void }) {
  return (
    <article className="card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-leaf">{item.day}曜日 / {item.category}</p>
          <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
        </div>
        <label className="flex items-center gap-2 rounded-xl bg-mint/25 px-3 py-2 text-sm font-semibold">
          <input type="checkbox" checked={checked} onChange={onToggle} /> 完了
        </label>
      </div>
      <ul className="mt-3 space-y-1 text-sm">{item.details.map((d) => <li key={d}>・{d}</li>)}</ul>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <Info label="時間" value={`${item.minutes}分`} />
        <Info label="消費" value={`${item.calories}kcal`} />
        <Info label="難易度" value={item.difficulty} />
      </div>
      <p className="mt-3 rounded-xl bg-lemon/45 p-3 text-sm">{item.notes}</p>
    </article>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-white/70 p-2"><p className="text-[11px] text-ink/60">{label}</p><p className="font-bold">{value}</p></div>;
}
