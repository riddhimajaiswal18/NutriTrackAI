import { useMemo } from "react";
import { useUserProfile } from "../context/UserProfileContext";
import { useFoodLog } from "../context/FoodLogContext";
import { getProgressPercentage, getProgressColor } from "../context/utils/nutritionCalc";
import { getProteinSuggestions } from "../context/utils/foodDatabase";

/**
 * Hook that computes nutrition insights by comparing daily intake vs targets
 */
const useNutritionCalc = () => {
  const { dailyTargets } = useUserProfile();
  const { dailyTotals } = useFoodLog();

  const progress = useMemo(() => {
    const caloriesPct = getProgressPercentage(dailyTotals.calories, dailyTargets.calories);
    const proteinPct = getProgressPercentage(dailyTotals.protein, dailyTargets.protein);
    const carbsPct = getProgressPercentage(dailyTotals.carbs, dailyTargets.carbs);
    const fatPct = getProgressPercentage(dailyTotals.fat, dailyTargets.fat);

    return {
      calories: {
        current: Math.round(dailyTotals.calories),
        target: dailyTargets.calories,
        percentage: caloriesPct,
        color: getProgressColor(caloriesPct),
        remaining: Math.max(0, dailyTargets.calories - dailyTotals.calories),
      },
      protein: {
        current: Math.round(dailyTotals.protein),
        target: dailyTargets.protein,
        percentage: proteinPct,
        color: getProgressColor(proteinPct),
        remaining: Math.max(0, dailyTargets.protein - dailyTotals.protein),
      },
      carbs: {
        current: Math.round(dailyTotals.carbs),
        target: dailyTargets.carbs,
        percentage: carbsPct,
        color: getProgressColor(carbsPct),
        remaining: Math.max(0, dailyTargets.carbs - dailyTotals.carbs),
      },
      fat: {
        current: Math.round(dailyTotals.fat),
        target: dailyTargets.fat,
        percentage: fatPct,
        color: getProgressColor(fatPct),
        remaining: Math.max(0, dailyTargets.fat - dailyTotals.fat),
      },
    };
  }, [dailyTotals, dailyTargets]);

  const suggestions = useMemo(() => {
    const remainingProtein = dailyTargets.protein - dailyTotals.protein;
    if (remainingProtein <= 5) return [];
    return getProteinSuggestions(remainingProtein);
  }, [dailyTotals.protein, dailyTargets.protein]);

  const overallScore = useMemo(() => {
    const avg = (progress.calories.percentage + progress.protein.percentage + progress.carbs.percentage + progress.fat.percentage) / 4;
    return Math.round(avg);
  }, [progress]);

  return { progress, suggestions, overallScore };
};

export default useNutritionCalc;
