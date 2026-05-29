import { Activity, Apple, Dumbbell, HeartPulse, Home, Menu, MessageCircle, Scale, Settings, Soup, UserRound } from 'lucide-react';
import type { ReactNode } from 'react';

const tabs = [
  ['dashboard', 'ダッシュボード', Home],
  ['profile', '基本情報', UserRound],
  ['plan', '減量プラン', HeartPulse],
  ['exercise', '運動', Dumbbell],
  ['meals', '食事記録', Apple],
  ['suggestion', '食事提案', Soup],
  ['weight', '体重', Scale],
  ['advice', '相談', MessageCircle],
  ['database', '食品DB', Activity],
  ['settings', '設定', Settings],
] as const;

type Props = {
  active: string;
  onChange: (tab: string) => void;
  children: ReactNode;
};

export default function Layout({ active, onChange, children }: Props) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#fffdf5_0%,#f2fbf0_45%,#fff4e6_100%)] pb-24 lg:pb-0">
      <header className="sticky top-0 z-20 border-b border-white/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div>
            <p className="text-xs font-semibold text-leaf">Diet Support Advisor</p>
            <h1 className="text-lg font-bold text-ink">ダイエット管理アドバイザー</h1>
          </div>
          <Menu className="h-5 w-5 text-leaf lg:hidden" />
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
          {tabs.map(([id, label, Icon]) => (
            <button key={id} onClick={() => onChange(id)} className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold ${active === id ? 'bg-mint text-ink' : 'bg-white text-ink/70'}`}>
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </nav>
      </header>
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <nav className="card sticky top-20 space-y-1">
            {tabs.map(([id, label, Icon]) => (
              <button key={id} onClick={() => onChange(id)} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold ${active === id ? 'bg-mint text-ink' : 'hover:bg-mint/25'}`}>
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-mint/60 bg-white/95 p-1 shadow-soft lg:hidden">
        {tabs.slice(0, 5).map(([id, label, Icon]) => (
          <button key={id} onClick={() => onChange(id)} className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-semibold ${active === id ? 'bg-mint text-ink' : 'text-ink/70'}`}>
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
