export type Gender = '女性' | '男性' | 'その他';
export type ActivityLevel = 'ほぼ座り仕事' | '軽い活動あり' | '立ち仕事が多い' | 'よく歩く' | '肉体労働またはかなり活動的';
export type ExerciseExperience = '初心者' | '中級者' | '上級者';
export type MealType = '朝食' | '昼食' | '夕食' | '間食' | '夜食' | '飲み物' | 'お酒' | '運動前' | '運動後';
export type FoodCategory =
  | '主食' | '肉' | '魚' | '卵' | '大豆製品' | '乳製品' | '野菜' | '果物' | '汁物'
  | 'お菓子' | '飲み物' | 'お酒' | '外食' | 'コンビニ' | '加工食品' | 'サプリメント' | 'その他';
export type CookingMethod = '生' | '茹で' | '焼き' | '蒸し' | '炒め' | '揚げ' | '煮物' | 'レンジ調理' | '外食' | 'コンビニ' | '不明';
export type Unit = 'g' | 'ml' | '個' | '杯' | '本' | '枚' | '切れ' | 'パック' | '袋' | '食' | '人前' | '大さじ' | '小さじ' | '缶';

export type Nutrition = {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  sugar: number;
  fiber: number;
  salt: number;
};

export type UserProfile = {
  nickname: string;
  gender: Gender;
  age: number;
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  targetMonths: number;
  bodyFatPercent?: number;
  activityLevel: ActivityLevel;
  exerciseExperience: ExerciseExperience;
  exerciseDaysPerWeek: number;
  exerciseMinutes: number;
  canHomeWorkout: boolean;
  canRun: boolean;
  canWalk: boolean;
  dislikedExercises: string;
  painConcerns: string;
  mealsPerDay: number;
  eatsBreakfast: boolean;
  eatingOutFrequency: string;
  convenienceStoreFrequency: string;
  cookingFrequency: string;
  snackFrequency: string;
  alcoholFrequency: string;
  favoriteFoods: string;
  dislikedFoods: string;
  allergies: string;
  avoidedIngredients: string;
  dietPreference: 'なし' | '軽め' | 'しっかり' | '糖質控えめ' | '脂質控えめ' | '高たんぱく' | '外食中心でも可能なプラン';
  wakeTime: string;
  sleepTime: string;
  sleepHours: number;
  workHours: string;
  stressLevel: number;
  holidayStyle: string;
  dietTroubles: string;
};

export type DietPlan = {
  totalLossKg: number;
  monthlyLossKg: number;
  weeklyLossKg: number;
  dailyDeficitKcal: number;
  bmi: number;
  targetBmi: number;
  bmr: number;
  tdee: number;
  recommendedCalories: number;
  proteinTarget: number;
  fatTarget: number;
  carbTarget: number;
  paceLabel: 'ゆるやか' | '標準' | 'ややハード' | '危険';
  warning?: string;
};

export type ExerciseItem = {
  id: string;
  day: string;
  category: '自宅筋トレ' | 'ウォーキング' | 'ランニング' | 'ストレッチ' | '休息日';
  title: string;
  details: string[];
  minutes: number;
  calories: number;
  difficulty: string;
  notes: string;
};

export type ExercisePlan = {
  items: ExerciseItem[];
};

export type FoodItem = {
  id: string;
  name: string;
  category: FoodCategory;
  baseAmount: number;
  unit: Unit;
  aliases?: string[];
  nutrition: Nutrition;
  memo?: string;
};

export type FoodEntry = {
  id: string;
  date: string;
  mealType: MealType;
  time: string;
  foodName: string;
  category: FoodCategory;
  amount: number;
  unit: Unit;
  quantity: number;
  cookingMethod: CookingMethod;
  memo: string;
  nutrition: Nutrition;
  sourceFoodId?: string;
};

export type MyFood = FoodItem & {
  createdAt: string;
};

export type SavedMeal = {
  id: string;
  name: string;
  entries: Omit<FoodEntry, 'id' | 'date' | 'mealType' | 'time'>[];
  totalNutrition: Nutrition;
  memo: string;
};

export type WeightRecord = {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPercent?: number;
  waistCm?: number;
  sleepHours?: number;
  steps?: number;
  memo: string;
};

export type AdviceItem = {
  id: string;
  date: string;
  concern: string;
  freeText: string;
  advice: string[];
};

export type AppSettings = {
  notifications: boolean;
  showHealthNotice: boolean;
  theme: 'pastel' | 'simple';
};

export type AppState = {
  profile: UserProfile;
  mealEntries: Record<string, FoodEntry[]>;
  myFoods: MyFood[];
  savedMeals: SavedMeal[];
  weightRecords: WeightRecord[];
  completedExercises: Record<string, string[]>;
  adviceHistory: AdviceItem[];
  settings: AppSettings;
};
