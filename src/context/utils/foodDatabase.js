/**
 * Local food database — ~100 common Indian + international foods
 * Each entry has nutrition values per 100g
 */
const foodDatabase = [
  // ─── Grains & Cereals ─────────────────────────────────────
  { id: 1, name: "White Rice (cooked)", category: "Grains", per100g: { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 } },
  { id: 2, name: "Brown Rice (cooked)", category: "Grains", per100g: { calories: 112, protein: 2.6, carbs: 24, fat: 0.9 } },
  { id: 3, name: "Wheat Roti", category: "Grains", per100g: { calories: 300, protein: 9, carbs: 50, fat: 7 } },
  { id: 4, name: "Oats", category: "Grains", per100g: { calories: 389, protein: 17, carbs: 66, fat: 7 } },
  { id: 5, name: "Bread (White)", category: "Grains", per100g: { calories: 265, protein: 9, carbs: 49, fat: 3.2 } },
  { id: 6, name: "Bread (Brown)", category: "Grains", per100g: { calories: 250, protein: 10, carbs: 46, fat: 3.5 } },
  { id: 7, name: "Pasta (cooked)", category: "Grains", per100g: { calories: 131, protein: 5, carbs: 25, fat: 1.1 } },
  { id: 8, name: "Poha (flattened rice)", category: "Grains", per100g: { calories: 110, protein: 2.5, carbs: 24, fat: 0.5 } },
  { id: 9, name: "Upma", category: "Grains", per100g: { calories: 135, protein: 3.5, carbs: 20, fat: 4.5 } },
  { id: 10, name: "Dosa", category: "Grains", per100g: { calories: 168, protein: 4, carbs: 27, fat: 4.5 } },
  { id: 11, name: "Idli", category: "Grains", per100g: { calories: 78, protein: 2, carbs: 16, fat: 0.4 } },
  { id: 12, name: "Paratha", category: "Grains", per100g: { calories: 260, protein: 7, carbs: 36, fat: 10 } },

  // ─── Dairy ────────────────────────────────────────────────
  { id: 13, name: "Paneer", category: "Dairy", per100g: { calories: 265, protein: 18, carbs: 3, fat: 20 } },
  { id: 14, name: "Milk (whole)", category: "Dairy", per100g: { calories: 62, protein: 3.2, carbs: 5, fat: 3.3 } },
  { id: 15, name: "Milk (toned)", category: "Dairy", per100g: { calories: 50, protein: 3, carbs: 5, fat: 1.5 } },
  { id: 16, name: "Curd / Yogurt", category: "Dairy", per100g: { calories: 60, protein: 3.5, carbs: 5, fat: 3.3 } },
  { id: 17, name: "Greek Yogurt", category: "Dairy", per100g: { calories: 97, protein: 9, carbs: 3.6, fat: 5 } },
  { id: 18, name: "Cheese (Cheddar)", category: "Dairy", per100g: { calories: 402, protein: 25, carbs: 1.3, fat: 33 } },
  { id: 19, name: "Butter", category: "Dairy", per100g: { calories: 717, protein: 0.9, carbs: 0.1, fat: 81 } },
  { id: 20, name: "Ghee", category: "Dairy", per100g: { calories: 900, protein: 0, carbs: 0, fat: 100 } },
  { id: 21, name: "Whey Protein Powder", category: "Dairy", per100g: { calories: 400, protein: 80, carbs: 8, fat: 5 } },

  // ─── Protein (Non-Veg) ────────────────────────────────────
  { id: 22, name: "Chicken Breast", category: "Protein", per100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6 } },
  { id: 23, name: "Chicken Thigh", category: "Protein", per100g: { calories: 209, protein: 26, carbs: 0, fat: 11 } },
  { id: 24, name: "Egg (whole, boiled)", category: "Protein", per100g: { calories: 155, protein: 13, carbs: 1.1, fat: 11 } },
  { id: 25, name: "Egg White", category: "Protein", per100g: { calories: 52, protein: 11, carbs: 0.7, fat: 0.2 } },
  { id: 26, name: "Fish (Rohu)", category: "Protein", per100g: { calories: 97, protein: 17, carbs: 0, fat: 3 } },
  { id: 27, name: "Salmon", category: "Protein", per100g: { calories: 208, protein: 20, carbs: 0, fat: 13 } },
  { id: 28, name: "Tuna (canned)", category: "Protein", per100g: { calories: 116, protein: 26, carbs: 0, fat: 1 } },
  { id: 29, name: "Prawns", category: "Protein", per100g: { calories: 99, protein: 24, carbs: 0.2, fat: 0.3 } },
  { id: 30, name: "Mutton", category: "Protein", per100g: { calories: 250, protein: 25, carbs: 0, fat: 16 } },

  // ─── Protein (Veg / Pulses) ───────────────────────────────
  { id: 31, name: "Moong Dal (cooked)", category: "Pulses", per100g: { calories: 105, protein: 7, carbs: 18, fat: 0.4 } },
  { id: 32, name: "Toor Dal (cooked)", category: "Pulses", per100g: { calories: 128, protein: 8, carbs: 22, fat: 0.6 } },
  { id: 33, name: "Chana Dal (cooked)", category: "Pulses", per100g: { calories: 140, protein: 9, carbs: 22, fat: 2.5 } },
  { id: 34, name: "Rajma (cooked)", category: "Pulses", per100g: { calories: 127, protein: 9, carbs: 22, fat: 0.5 } },
  { id: 35, name: "Chickpeas (cooked)", category: "Pulses", per100g: { calories: 164, protein: 9, carbs: 27, fat: 2.6 } },
  { id: 36, name: "Soybean", category: "Pulses", per100g: { calories: 173, protein: 17, carbs: 10, fat: 9 } },
  { id: 37, name: "Tofu", category: "Pulses", per100g: { calories: 76, protein: 8, carbs: 1.9, fat: 4.8 } },
  { id: 38, name: "Peanuts", category: "Pulses", per100g: { calories: 567, protein: 26, carbs: 16, fat: 49 } },
  { id: 39, name: "Sprouts (Moong)", category: "Pulses", per100g: { calories: 30, protein: 3, carbs: 6, fat: 0.2 } },
  { id: 40, name: "Masoor Dal (cooked)", category: "Pulses", per100g: { calories: 116, protein: 9, carbs: 20, fat: 0.4 } },

  // ─── Vegetables ───────────────────────────────────────────
  { id: 41, name: "Potato (boiled)", category: "Vegetables", per100g: { calories: 87, protein: 1.9, carbs: 20, fat: 0.1 } },
  { id: 42, name: "Sweet Potato", category: "Vegetables", per100g: { calories: 86, protein: 1.6, carbs: 20, fat: 0.1 } },
  { id: 43, name: "Broccoli", category: "Vegetables", per100g: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 } },
  { id: 44, name: "Spinach", category: "Vegetables", per100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 } },
  { id: 45, name: "Cauliflower", category: "Vegetables", per100g: { calories: 25, protein: 2, carbs: 5, fat: 0.3 } },
  { id: 46, name: "Tomato", category: "Vegetables", per100g: { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 } },
  { id: 47, name: "Onion", category: "Vegetables", per100g: { calories: 40, protein: 1.1, carbs: 9, fat: 0.1 } },
  { id: 48, name: "Carrot", category: "Vegetables", per100g: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 } },
  { id: 49, name: "Capsicum (Bell Pepper)", category: "Vegetables", per100g: { calories: 31, protein: 1, carbs: 6, fat: 0.3 } },
  { id: 50, name: "Mushroom", category: "Vegetables", per100g: { calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3 } },
  { id: 51, name: "Cucumber", category: "Vegetables", per100g: { calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1 } },
  { id: 52, name: "Peas (green)", category: "Vegetables", per100g: { calories: 81, protein: 5, carbs: 14, fat: 0.4 } },
  { id: 53, name: "Corn (sweet)", category: "Vegetables", per100g: { calories: 86, protein: 3.3, carbs: 19, fat: 1.2 } },

  // ─── Fruits ───────────────────────────────────────────────
  { id: 54, name: "Banana", category: "Fruits", per100g: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 } },
  { id: 55, name: "Apple", category: "Fruits", per100g: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 } },
  { id: 56, name: "Mango", category: "Fruits", per100g: { calories: 60, protein: 0.8, carbs: 15, fat: 0.4 } },
  { id: 57, name: "Orange", category: "Fruits", per100g: { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 } },
  { id: 58, name: "Papaya", category: "Fruits", per100g: { calories: 43, protein: 0.5, carbs: 11, fat: 0.3 } },
  { id: 59, name: "Watermelon", category: "Fruits", per100g: { calories: 30, protein: 0.6, carbs: 8, fat: 0.2 } },
  { id: 60, name: "Grapes", category: "Fruits", per100g: { calories: 69, protein: 0.7, carbs: 18, fat: 0.2 } },
  { id: 61, name: "Pomegranate", category: "Fruits", per100g: { calories: 83, protein: 1.7, carbs: 19, fat: 1.2 } },
  { id: 62, name: "Guava", category: "Fruits", per100g: { calories: 68, protein: 2.6, carbs: 14, fat: 1 } },
  { id: 63, name: "Pineapple", category: "Fruits", per100g: { calories: 50, protein: 0.5, carbs: 13, fat: 0.1 } },
  { id: 64, name: "Strawberry", category: "Fruits", per100g: { calories: 32, protein: 0.7, carbs: 8, fat: 0.3 } },
  { id: 65, name: "Blueberry", category: "Fruits", per100g: { calories: 57, protein: 0.7, carbs: 14, fat: 0.3 } },

  // ─── Nuts & Seeds ─────────────────────────────────────────
  { id: 66, name: "Almonds", category: "Nuts", per100g: { calories: 579, protein: 21, carbs: 22, fat: 50 } },
  { id: 67, name: "Walnuts", category: "Nuts", per100g: { calories: 654, protein: 15, carbs: 14, fat: 65 } },
  { id: 68, name: "Cashews", category: "Nuts", per100g: { calories: 553, protein: 18, carbs: 30, fat: 44 } },
  { id: 69, name: "Flax Seeds", category: "Nuts", per100g: { calories: 534, protein: 18, carbs: 29, fat: 42 } },
  { id: 70, name: "Chia Seeds", category: "Nuts", per100g: { calories: 486, protein: 17, carbs: 42, fat: 31 } },
  { id: 71, name: "Sunflower Seeds", category: "Nuts", per100g: { calories: 584, protein: 21, carbs: 20, fat: 51 } },

  // ─── Snacks & Fast Food ───────────────────────────────────
  { id: 72, name: "Samosa", category: "Snacks", per100g: { calories: 262, protein: 5, carbs: 30, fat: 14 } },
  { id: 73, name: "Vada Pav", category: "Snacks", per100g: { calories: 290, protein: 6, carbs: 40, fat: 12 } },
  { id: 74, name: "Pizza (cheese)", category: "Snacks", per100g: { calories: 266, protein: 11, carbs: 33, fat: 10 } },
  { id: 75, name: "Burger (Veg)", category: "Snacks", per100g: { calories: 240, protein: 8, carbs: 28, fat: 11 } },
  { id: 76, name: "French Fries", category: "Snacks", per100g: { calories: 312, protein: 3.4, carbs: 41, fat: 15 } },
  { id: 77, name: "Maggi Noodles", category: "Snacks", per100g: { calories: 390, protein: 9, carbs: 57, fat: 14 } },
  { id: 78, name: "Biscuits (Marie)", category: "Snacks", per100g: { calories: 420, protein: 7, carbs: 72, fat: 11 } },
  { id: 79, name: "Chips (Potato)", category: "Snacks", per100g: { calories: 536, protein: 7, carbs: 53, fat: 35 } },
  { id: 80, name: "Popcorn (plain)", category: "Snacks", per100g: { calories: 375, protein: 11, carbs: 74, fat: 4.3 } },

  // ─── Cooked Dishes ────────────────────────────────────────
  { id: 81, name: "Dal Fry", category: "Dishes", per100g: { calories: 120, protein: 7, carbs: 18, fat: 3 } },
  { id: 82, name: "Palak Paneer", category: "Dishes", per100g: { calories: 150, protein: 10, carbs: 5, fat: 10 } },
  { id: 83, name: "Chole (Chana Masala)", category: "Dishes", per100g: { calories: 160, protein: 8, carbs: 22, fat: 5 } },
  { id: 84, name: "Aloo Gobi", category: "Dishes", per100g: { calories: 100, protein: 3, carbs: 14, fat: 4 } },
  { id: 85, name: "Chicken Curry", category: "Dishes", per100g: { calories: 180, protein: 18, carbs: 6, fat: 9 } },
  { id: 86, name: "Egg Curry", category: "Dishes", per100g: { calories: 150, protein: 10, carbs: 5, fat: 10 } },
  { id: 87, name: "Biryani (Chicken)", category: "Dishes", per100g: { calories: 200, protein: 12, carbs: 25, fat: 6 } },
  { id: 88, name: "Biryani (Veg)", category: "Dishes", per100g: { calories: 160, protein: 4, carbs: 28, fat: 4 } },
  { id: 89, name: "Khichdi", category: "Dishes", per100g: { calories: 120, protein: 5, carbs: 20, fat: 2 } },
  { id: 90, name: "Fried Rice", category: "Dishes", per100g: { calories: 170, protein: 4, carbs: 25, fat: 6 } },

  // ─── Beverages ────────────────────────────────────────────
  { id: 91, name: "Tea (with milk & sugar)", category: "Beverages", per100g: { calories: 37, protein: 0.7, carbs: 6, fat: 1 } },
  { id: 92, name: "Coffee (black)", category: "Beverages", per100g: { calories: 2, protein: 0.3, carbs: 0, fat: 0 } },
  { id: 93, name: "Coffee (with milk)", category: "Beverages", per100g: { calories: 30, protein: 1.5, carbs: 3, fat: 1.2 } },
  { id: 94, name: "Lassi (sweet)", category: "Beverages", per100g: { calories: 70, protein: 2, carbs: 12, fat: 2 } },
  { id: 95, name: "Coconut Water", category: "Beverages", per100g: { calories: 19, protein: 0.7, carbs: 4, fat: 0.2 } },
  { id: 96, name: "Orange Juice", category: "Beverages", per100g: { calories: 45, protein: 0.7, carbs: 10, fat: 0.2 } },
  { id: 97, name: "Protein Shake (mixed)", category: "Beverages", per100g: { calories: 120, protein: 20, carbs: 8, fat: 2 } },
  { id: 98, name: "Coca Cola", category: "Beverages", per100g: { calories: 42, protein: 0, carbs: 11, fat: 0 } },
  { id: 99, name: "Mango Shake", category: "Beverages", per100g: { calories: 90, protein: 2, carbs: 18, fat: 2 } },
  { id: 100, name: "Buttermilk (Chaas)", category: "Beverages", per100g: { calories: 25, protein: 1.5, carbs: 3, fat: 0.8 } },
];

/**
 * Search foods by name (case-insensitive, fuzzy-ish match)
 */
export const searchFoods = (query) => {
  if (!query || query.trim().length < 2) return [];
  const lower = query.toLowerCase().trim();
  return foodDatabase.filter((food) =>
    food.name.toLowerCase().includes(lower)
  );
};

/**
 * Get food by ID
 */
export const getFoodById = (id) => {
  return foodDatabase.find((food) => food.id === id);
};

/**
 * Get all foods grouped by category
 */
export const getFoodsByCategory = () => {
  const grouped = {};
  foodDatabase.forEach((food) => {
    if (!grouped[food.category]) grouped[food.category] = [];
    grouped[food.category].push(food);
  });
  return grouped;
};

/**
 * Calculate nutrition for a given food item and quantity
 */
export const calculateNutrition = (foodItem, quantityGrams) => {
  const factor = quantityGrams / 100;
  return {
    calories: Math.round(foodItem.per100g.calories * factor),
    protein: Math.round(foodItem.per100g.protein * factor * 10) / 10,
    carbs: Math.round(foodItem.per100g.carbs * factor * 10) / 10,
    fat: Math.round(foodItem.per100g.fat * factor * 10) / 10,
  };
};

/**
 * Get food suggestions to meet remaining protein target
 */
export const getProteinSuggestions = (remainingProtein) => {
  if (remainingProtein <= 0) return [];
  
  const highProteinFoods = foodDatabase
    .filter((f) => f.per100g.protein >= 8)
    .sort((a, b) => b.per100g.protein - a.per100g.protein)
    .slice(0, 5);

  return highProteinFoods.map((food) => {
    const needed = Math.round((remainingProtein / food.per100g.protein) * 100);
    return {
      food,
      suggestedQuantity: needed,
      nutrition: calculateNutrition(food, needed),
    };
  });
};

/**
 * Get all categories
 */
export const getCategories = () => {
  return [...new Set(foodDatabase.map((f) => f.category))];
};

export default foodDatabase;
