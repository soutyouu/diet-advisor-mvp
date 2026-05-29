import type { ExerciseItem, UserProfile } from '../types';

const weekdays = ['月', '火', '水', '木', '金', '土', '日'];

export const generateExercisePlan = (profile: UserProfile): ExerciseItem[] => {
  const days = Math.min(Math.max(profile.exerciseDaysPerWeek, 1), 6);
  const isBeginner = profile.exerciseExperience === '初心者';
  const isAdvanced = profile.exerciseExperience === '上級者';
  const sets = isBeginner ? '1-2セット' : isAdvanced ? '3-4セット' : '2-3セット';
  const reps = isBeginner ? '10-15回' : isAdvanced ? '20回以上' : '15-20回';
  const plank = isBeginner ? '20秒' : isAdvanced ? '60秒' : '30-45秒';
  const strength = ['スクワット', isBeginner ? '膝つき腕立て伏せ' : '腕立て伏せ', `プランク${plank}`, 'ヒップリフト', '肩甲骨ストレッチ'];
  const plan: ExerciseItem[] = [];

  weekdays.forEach((day, index) => {
    if (index >= days) {
      plan.push({
        id: `rest-${day}`,
        day,
        category: '休息日',
        title: '回復を優先する日',
        details: ['軽い散歩、入浴、睡眠を大切にしましょう'],
        minutes: 10,
        calories: 30,
        difficulty: 'やさしい',
        notes: '疲労が抜けると次の運動が続きやすくなります。',
      });
      return;
    }

    const canRun = profile.canRun && !profile.dislikedExercises.includes('ランニング');
    const category = index % 3 === 1 && canRun ? 'ランニング' : index % 3 === 2 || !profile.canHomeWorkout ? 'ウォーキング' : '自宅筋トレ';
    const minutes = Math.max(10, profile.exerciseMinutes);
    const calories = category === 'ランニング' ? minutes * 8 : category === 'ウォーキング' ? minutes * 4 : minutes * 5;
    plan.push({
      id: `exercise-${day}`,
      day,
      category,
      title: category === '自宅筋トレ' ? `${sets}の全身メニュー` : category === 'ランニング' ? '軽いジョグとウォーク' : '会話できる速さのウォーキング',
      details: category === '自宅筋トレ'
        ? strength.map((m) => `${m} ${reps}`)
        : category === 'ランニング'
          ? ['5分歩く', '軽く走る/歩くを交互に行う']
          : ['背筋を伸ばして歩く', '終わったらふくらはぎを伸ばす'],
      minutes,
      calories,
      difficulty: isBeginner ? '低' : isAdvanced ? '高' : '中',
      notes: profile.painConcerns ? `${profile.painConcerns}に違和感があれば中止しましょう。` : '息が上がりすぎない強度で十分です。',
    });
  });
  return plan;
};
