import coachImage from '../assets/coach-character.png';

type Props = {
  message: string;
  compact?: boolean;
};

export default function CharacterCoach({ message, compact = false }: Props) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl bg-lemon/45 p-3 ${compact ? '' : 'md:p-4'}`}>
      <img src={coachImage} alt="応援キャラクター" className={`${compact ? 'h-16 w-16' : 'h-24 w-24'} rounded-2xl object-cover`} />
      <div>
        <p className="text-xs font-semibold text-leaf">コーチから</p>
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
