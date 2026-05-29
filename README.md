# ダイエット管理アドバイザー MVP

React + TypeScript + Tailwind CSS + Vite のフロントエンドのみで動くMVPです。入力データはLocalStorageに保存されます。

## セットアップ

```bash
npm install
npm run dev
```

## 実行方法

開発サーバー起動後、表示されたURLをブラウザで開きます。

```bash
npm run build
npm run preview
```

## GitHub Pagesで一般公開する方法

1. GitHubで新しいリポジトリを作成します。
2. このフォルダをリポジトリにpushします。
3. GitHubのリポジトリ画面で `Settings` → `Pages` を開きます。
4. `Build and deployment` の `Source` を `GitHub Actions` にします。
5. `Actions` タブで `Deploy to GitHub Pages` が成功するのを待ちます。

公開URLは通常、次の形式になります。

```text
https://<GitHubユーザー名>.github.io/<リポジトリ名>/
```

このプロジェクトはGitHub Actions内でViteの `base` を自動設定するため、リポジトリ名が変わってもそのまま公開できます。

## 画像の配置

応援キャラクター画像は次に配置済みです。

```text
src/assets/coach-character.png
```

別画像に差し替える場合も同じファイル名で置き換えると、アプリ内表示に反映されます。

## ファイル構成

```text
src/
  main.tsx
  App.tsx
  types/index.ts
  data/foodDatabase.ts
  data/adviceRules.ts
  data/exerciseTemplates.ts
  utils/calorieCalculator.ts
  utils/dietPlanCalculator.ts
  utils/nutritionCalculator.ts
  utils/localStorage.ts
  utils/dateUtils.ts
  components/Layout.tsx
  components/CharacterCoach.tsx
  components/Dashboard.tsx
  components/ProfileForm.tsx
  components/DietPlanView.tsx
  components/ExercisePlanView.tsx
  components/MealLogger.tsx
  components/FoodSearchInput.tsx
  components/FoodEntryForm.tsx
  components/MealSummary.tsx
  components/FoodDatabaseManager.tsx
  components/MealSuggestion.tsx
  components/WeightTracker.tsx
  components/AdviceChat.tsx
  components/ProgressChart.tsx
  assets/coach-character.png
```

## 今後の拡張案

- 食品API連携、バーコード読み取り、食事画像認識
- 週次レポートと停滞時の自動プラン調整
- PWA化と通知リマインダー
- 管理栄養士監修データの導入
- グラフの詳細化とCSVエクスポート
