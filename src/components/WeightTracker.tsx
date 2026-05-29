import { useMemo, useState } from 'react';
import type { UserProfile, WeightRecord } from '../types';
import CharacterCoach from './CharacterCoach';
import ProgressChart from './ProgressChart';
import { todayKey, uid } from '../utils/dateUtils';

export default function WeightTracker({ profile, records, onAdd }: { profile: UserProfile; records: WeightRecord[]; onAdd: (record: WeightRecord) => void }) {
  const [date, setDate] = useState(todayKey());
  const [weightKg, setWeightKg] = useState(profile.currentWeightKg);
  const [bodyFatPercent, setBodyFatPercent] = useState('');
  const [waistCm, setWaistCm] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [steps, setSteps] = useState('');
  const [memo, setMemo] = useState('');
  const sorted = useMemo(() => [...records].sort((a, b) => a.date.localeCompare(b.date)), [records]);
  const latest = sorted[sorted.length - 1];
  const previous = sorted[sorted.length - 2];
  const avg7 = sorted.slice(-7).reduce((sum, r) => sum + r.weightKg, 0) / Math.max(sorted.slice(-7).length, 1);
  const start = sorted[0]?.weightKg ?? profile.currentWeightKg;
  const remaining = Math.max(0, (latest?.weightKg ?? profile.currentWeightKg) - profile.targetWeightKg);
  const progress = Math.min(100, Math.max(0, ((start - (latest?.weightKg ?? start)) / Math.max(start - profile.targetWeightKg, 1)) * 100));
  const coach = latest && previous && latest.weightKg > previous.weightKg
    ? '体重は水分量でも上下します。1日の増減よりも7日平均で見ましょう。'
    : latest && latest.weightKg < start
      ? '体重が減っています！ただし急ぎすぎず、食事と睡眠も守っていきましょう。'
      : '記録できて素晴らしいです。まずは続けることが一番大切です。';

  const submit = () => {
    onAdd({ id: uid('weight'), date, weightKg, bodyFatPercent: num(bodyFatPercent), waistCm: num(waistCm), sleepHours: num(sleepHours), steps: num(steps), memo });
  };

  return (
    <div className="space-y-5">
      <CharacterCoach message={coach} />
      <section className="card grid gap-3 md:grid-cols-3">
        <Input label="日付" type="date" value={date} onChange={setDate} />
        <Input label="体重" type="number" value={weightKg} onChange={(v) => setWeightKg(Number(v))} />
        <Input label="体脂肪率 任意" type="number" value={bodyFatPercent} onChange={setBodyFatPercent} />
        <Input label="ウエスト 任意" type="number" value={waistCm} onChange={setWaistCm} />
        <Input label="睡眠時間 任意" type="number" value={sleepHours} onChange={setSleepHours} />
        <Input label="歩数 任意" type="number" value={steps} onChange={setSteps} />
        <label className="md:col-span-3"><span className="mb-1 block text-sm font-semibold">メモ</span><textarea className="field" value={memo} onChange={(e) => setMemo(e.target.value)} /></label>
        <button className="btn md:col-span-3" onClick={submit}>体重を記録</button>
      </section>
      <section className="card">
        <h2 className="mb-3 text-lg font-bold">体重推移グラフ</h2>
        <ProgressChart records={records} />
        <div className="mt-4 grid gap-2 text-sm md:grid-cols-5">
          <Info label="7日平均" value={`${avg7 ? avg7.toFixed(1) : '-'}kg`} />
          <Info label="前回比" value={latest && previous ? `${(latest.weightKg - previous.weightKg).toFixed(1)}kg` : '-'} />
          <Info label="開始時から" value={latest ? `${(latest.weightKg - start).toFixed(1)}kg` : '-'} />
          <Info label="目標まで" value={`${remaining.toFixed(1)}kg`} />
          <Info label="達成率" value={`${Math.round(progress)}%`} />
        </div>
      </section>
    </div>
  );
}
const num = (v: string) => v === '' ? undefined : Number(v);
function Input({ label, value, onChange, type = 'text' }: { label: string; value: string | number; onChange: (v: string) => void; type?: string }) {
  return <label><span className="mb-1 block text-sm font-semibold">{label}</span><input className="field" type={type} value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}
function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-mint/20 p-3"><p className="text-xs font-semibold text-leaf">{label}</p><p className="font-bold">{value}</p></div>;
}
