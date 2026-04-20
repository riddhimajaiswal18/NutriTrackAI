// ─── BMR Calculation (Mifflin-St Jeor) ──────────────────────

/**
 * Calculate Basal Metabolic Rate
 * @param {number} weight - in kg
 * @param {number} height - in cm
 * @param {number} age - in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in kcal/day
 */
export const calculateBMR = (weight, height, age, gender = "male") => {
  if (gender === "female") {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return 10 * weight + 6.25 * height - 5 * age + 5;
};

// ─── Activity Multipliers ───────────────────────────────────

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const PROTEIN_FACTORS = {
  sedentary: 0.8,
  moderate: 1.0,
  active: 1.2,
  very_active: 1.5,
};

// ─── TDEE Calculation ───────────────────────────────────────

/**
 * Calculate Total Daily Energy Expenditure
 * @param {number} bmr
 * @param {string} activityLevel
 * @returns {number} TDEE in kcal/day
 */
export const calculateTDEE = (bmr, activityLevel = "moderate") => {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  return Math.round(bmr * multiplier);
};

// ─── Goal-Adjusted Calories ─────────────────────────────────

/**
 * Adjust calories based on user's goal
 * @param {number} tdee
 * @param {string} goal - 'maintain' | 'lose' | 'gain'
 * @returns {number} target calories
 */
export const adjustCaloriesForGoal = (tdee, goal = "maintain") => {
  switch (goal) {
    case "lose":
      return tdee - 500;
    case "gain":
      return tdee + 500;
    default:
      return tdee;
  }
};

// ─── Macro Targets ──────────────────────────────────────────

/**
 * Calculate daily macro targets
 * @param {object} profile - { weight, height, age, gender, activityLevel, goal }
 * @returns {object} { calories, protein, carbs, fat }
 */
export const calculateDailyTargets = (profile) => {
  const { weight, height, age, gender, activityLevel, goal } = profile;

  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const calories = adjustCaloriesForGoal(tdee, goal);

  const proteinFactor = PROTEIN_FACTORS[activityLevel] || 1.0;
  const protein = Math.round(weight * proteinFactor);

  // Fat = 25% of total calories
  const fatCalories = calories * 0.25;
  const fat = Math.round(fatCalories / 9);

  // Carbs = remaining calories
  const proteinCalories = protein * 4;
  const carbCalories = calories - proteinCalories - fatCalories;
  const carbs = Math.round(carbCalories / 4);

  return {
    calories: Math.round(calories),
    protein,
    carbs: Math.max(carbs, 0),
    fat,
  };
};

// ─── BMI Calculation ────────────────────────────────────────

export const calculateBMI = (weight, height) => {
  const heightM = height / 100;
  return (weight / (heightM * heightM)).toFixed(1);
};

export const getBMICategory = (bmi) => {
  const val = parseFloat(bmi);
  if (val < 18.5) return { label: "Underweight", color: "#f59e0b" };
  if (val < 25) return { label: "Normal", color: "#10b981" };
  if (val < 30) return { label: "Overweight", color: "#f59e0b" };
  return { label: "Obese", color: "#ef4444" };
};

// ─── Progress Helpers ───────────────────────────────────────

export const getProgressPercentage = (current, target) => {
  if (!target) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
};

export const getProgressColor = (percentage) => {
  if (percentage >= 90) return "#10b981";
  if (percentage >= 60) return "#06b6d4";
  if (percentage >= 30) return "#f59e0b";
  return "#ef4444";
};
