import { useState } from 'react';
import type { AdviceItem } from '../types';
import { concernOptions, getAdvice } from '../data/adviceRules';
import { todayKey, uid } from '../utils/dateUtils';
import CharacterCoach from './CharacterCoach';

export default function AdviceChat({ history, onAdd }: { history: AdviceItem[]; onAdd: (item: AdviceItem) => void }) {
  const [concern, setConcern] = useState(concernOptions[0]);
  const [freeText, setFreeText] = useState('');
  const advice = getAdvice(concern, freeText);
  const save = () => onAdd({ id: uid('advice'), date: todayKey(), concern, freeText, advice });

  return (
    <div className="space-y-5">
      <CharacterCoach message="困りごとは、意思の弱さではなく仕組みで軽くできることが多いです。一緒に整理しましょう。" />
      <section className="card">
        <h2 className="mb-3 text-lg font-bold">相談・アドバイス</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <label><span className="mb-1 block text-sm font-semibold">選択式の悩み</span><select className="field" value={concern} onChange={(e) => setConcern(e.target.value)}>{concernOptions.map((o) => <option key={o}>{o}</option>)}</select></label>
          <label><span className="mb-1 block text-sm font-semibold">自由入力</span><textarea className="field min-h-24" value={freeText} onChange={(e) => setFreeText(e.target.value)} /></label>
        </div>
        <div className="mt-4 rounded-2xl bg-lemon/45 p-4">
          <h3 className="mb-2 font-bold">アドバイス</h3>
          <ul className="space-y-1 text-sm">{advice.map((a) => <li key={a}>・{a}</li>)}</ul>
        </div>
        <button className="btn mt-4" onClick={save}>相談履歴に保存</button>
      </section>
      {history.length > 0 && <section className="card"><h2 className="mb-3 font-bold">相談履歴</h2><div className="space-y-2">{history.slice(-5).reverse().map((h) => <div key={h.id} className="rounded-xl bg-white/75 p-3 text-sm"><strong>{h.date} {h.concern}</strong><p>{h.freeText}</p></div>)}</div></section>}
    </div>
  );
}
