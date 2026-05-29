import type { WeightRecord } from '../types';
import { formatDate } from '../utils/dateUtils';

export default function ProgressChart({ records }: { records: WeightRecord[] }) {
  const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date)).slice(-14);
  if (sorted.length < 2) return <div className="rounded-xl bg-mint/20 p-4 text-sm">体重を2日以上記録するとグラフが表示されます。</div>;

  const weights = sorted.map((r) => r.weightKg);
  const min = Math.min(...weights) - 0.5;
  const max = Math.max(...weights) + 0.5;
  const points = sorted.map((r, i) => {
    const x = (i / Math.max(sorted.length - 1, 1)) * 100;
    const y = 100 - ((r.weightKg - min) / Math.max(max - min, 1)) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-40 w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <polyline fill="none" stroke="#77b27d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} />
        {sorted.map((r, i) => {
          const x = (i / Math.max(sorted.length - 1, 1)) * 100;
          const y = 100 - ((r.weightKg - min) / Math.max(max - min, 1)) * 100;
          return <circle key={r.id} cx={x} cy={y} r="2.6" fill="#ffb873" />;
        })}
      </svg>
      <div className="mt-1 flex justify-between text-[11px] text-ink/60">
        <span>{formatDate(sorted[0].date)}</span>
        <span>{formatDate(sorted[sorted.length - 1].date)}</span>
      </div>
    </div>
  );
}
