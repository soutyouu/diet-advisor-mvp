import type { AppState, UserProfile } from '../types';

const KEY = 'diet-advisor-state-v1';

export const defaultProfile: UserProfile = {
  nickname: 'ゲスト',
  gender: '女性',
  age: 32,
  heightCm: 160,
  currentWeightKg: 62,
  targetWeightKg: 56,
  targetMonths: 4,
  activityLevel: '軽い活動あり',
  exerciseExperience: '初心者',
  exerciseDaysPerWeek: 3,
  exerciseMinutes: 30,
  canHomeWorkout: true,
  canRun: false,
  canWalk: true,
  dislikedExercises: '',
  painConcerns: '',
  mealsPerDay: 3,
  eatsBreakfast: true,
  eatingOutFrequency: '週1-2回',
  convenienceStoreFrequency: '週1-2回',
  cookingFrequency: '週3-4回',
  snackFrequency: '時々',
  alcoholFrequency: '少なめ',
  favoriteFoods: '',
  dislikedFoods: '',
  allergies: '',
  avoidedIngredients: '',
  dietPreference: '軽め',
  wakeTime: '07:00',
  sleepTime: '23:30',
  sleepHours: 7,
  workHours: '9:00-18:00',
  stressLevel: 3,
  holidayStyle: '散歩と休息',
  dietTroubles: '',
};

export const defaultState: AppState = {
  profile: defaultProfile,
  mealEntries: {},
  myFoods: [],
  savedMeals: [],
  weightRecords: [],
  completedExercises: {},
  adviceHistory: [],
  settings: {
    notifications: false,
    showHealthNotice: true,
    theme: 'pastel',
  },
};

export const loadState = (): AppState => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
  } catch {
    return defaultState;
  }
};

export const saveState = (state: AppState) => {
  localStorage.setItem(KEY, JSON.stringify(state));
};
