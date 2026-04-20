import { useState, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFoodLog } from "../context/FoodLogContext";
import useDebounce from "../hooks/useDebounce";
import { searchFoods, calculateNutrition, getCategories, getFoodsByCategory } from "../context/utils/foodDatabase";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import {
  Search, Plus, ArrowLeft, Check, Flame, Beef, Wheat, Droplets, ChevronDown,
} from "lucide-react";
import "./AddFoodPage.css";

const AddFoodPage = () => {
  const { addLog } = useFoodLog();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const debouncedQuery = useDebounce(searchQuery, 300);

  const searchResults = useMemo(() => {
    if (debouncedQuery.length >= 2) {
      return searchFoods(debouncedQuery);
    }
    return [];
  }, [debouncedQuery]);

  const categories = useMemo(() => getCategories(), []);
  const foodsByCategory = useMemo(() => getFoodsByCategory(), []);

  const nutrition = useMemo(() => {
    if (!selectedFood) return null;
    return calculateNutrition(selectedFood, quantity);
  }, [selectedFood, quantity]);

  const handleSelectFood = useCallback((food) => {
    setSelectedFood(food);
    setSearchQuery("");
    setQuantity(100);
    setSuccess(false);
  }, []);

  const handleAdd = useCallback(async () => {
    if (!selectedFood || !nutrition) return;
    try {
      setAdding(true);
      await addLog({
        foodName: selectedFood.name,
        quantity,
        calories: nutrition.calories,
        protein: nutrition.protein,
        carbs: nutrition.carbs,
        fat: nutrition.fat,
      });
      setSuccess(true);
      setTimeout(() => {
        setSelectedFood(null);
        setSuccess(false);
      }, 1500);
    } catch (err) {
      console.error("Error adding food:", err);
    } finally {
      setAdding(false);
    }
  }, [selectedFood, quantity, nutrition, addLog]);

  return (
    <div className="add-food">
      {/* Header */}
      <div className="add-food-header animate-fade-in">
        <button className="add-food-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Add Food</h1>
      </div>

      {/* Search */}
      <div className="add-food-search animate-fade-in-up">
        <div className="add-food-search-wrapper">
          <Search size={20} className="add-food-search-icon" />
          <input
            ref={searchRef}
            type="text"
            className="form-input add-food-search-input"
            placeholder="Search for a food... (e.g., paneer, chicken, rice)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Card className="add-food-results" padding="none">
            {searchResults.map((food) => (
              <button
                key={food.id}
                className="add-food-result-item"
                onClick={() => handleSelectFood(food)}
              >
                <div className="add-food-result-info">
                  <span className="add-food-result-name">{food.name}</span>
                  <span className="add-food-result-category">{food.category}</span>
                </div>
                <div className="add-food-result-macros">
                  <span>{food.per100g.calories} kcal</span>
                  <span>{food.per100g.protein}g P</span>
                </div>
              </button>
            ))}
          </Card>
        )}

        {debouncedQuery.length >= 2 && searchResults.length === 0 && (
          <p className="add-food-no-results">No foods found for "{debouncedQuery}"</p>
        )}
      </div>

      {/* Selected Food */}
      {selectedFood && (
        <div className="add-food-selected animate-fade-in-up">
          <Card variant="gradient" padding="lg" glow>
            {success ? (
              <div className="add-food-success">
                <div className="add-food-success-icon">
                  <Check size={32} />
                </div>
                <h3>Added successfully!</h3>
                <p>{selectedFood.name} — {quantity}g</p>
              </div>
            ) : (
              <>
                <div className="add-food-selected-header">
                  <div>
                    <h2 className="add-food-selected-name">{selectedFood.name}</h2>
                    <span className="add-food-selected-category">{selectedFood.category}</span>
                  </div>
                </div>

                {/* Quantity Input */}
                <div className="add-food-quantity">
                  <label className="form-label">Quantity (grams)</label>
                  <div className="add-food-quantity-controls">
                    {[50, 100, 150, 200, 250].map((q) => (
                      <button
                        key={q}
                        className={`add-food-qty-btn ${quantity === q ? "add-food-qty-btn-active" : ""}`}
                        onClick={() => setQuantity(q)}
                      >
                        {q}g
                      </button>
                    ))}
                    <input
                      type="number"
                      className="form-input add-food-qty-input"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      min="1"
                      max="2000"
                    />
                  </div>
                </div>

                {/* Nutrition Preview */}
                {nutrition && (
                  <div className="add-food-nutrition">
                    <h3 className="add-food-nutrition-title">Nutrition for {quantity}g</h3>
                    <div className="add-food-nutrition-grid">
                      <div className="add-food-nutrient">
                        <Flame size={18} style={{ color: "var(--color-calories)" }} />
                        <span className="add-food-nutrient-value">{nutrition.calories}</span>
                        <span className="add-food-nutrient-label">Calories</span>
                      </div>
                      <div className="add-food-nutrient">
                        <Beef size={18} style={{ color: "var(--color-protein)" }} />
                        <span className="add-food-nutrient-value">{nutrition.protein}g</span>
                        <span className="add-food-nutrient-label">Protein</span>
                      </div>
                      <div className="add-food-nutrient">
                        <Wheat size={18} style={{ color: "var(--color-carbs)" }} />
                        <span className="add-food-nutrient-value">{nutrition.carbs}g</span>
                        <span className="add-food-nutrient-label">Carbs</span>
                      </div>
                      <div className="add-food-nutrient">
                        <Droplets size={18} style={{ color: "var(--color-fat)" }} />
                        <span className="add-food-nutrient-value">{nutrition.fat}g</span>
                        <span className="add-food-nutrient-label">Fat</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button onClick={handleAdd} loading={adding} fullWidth size="lg" icon={Plus}>
                  Add to Today's Log
                </Button>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Browse by Category */}
      {!selectedFood && searchQuery.length < 2 && (
        <div className="add-food-browse animate-fade-in-up">
          <h2 className="add-food-browse-title">Browse by Category</h2>
          <div className="add-food-categories">
            {categories.map((cat) => (
              <div key={cat} className="add-food-category">
                <button
                  className={`add-food-category-header ${activeCategory === cat ? "add-food-category-header-active" : ""}`}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                >
                  <span>{cat}</span>
                  <span className="add-food-category-count">{foodsByCategory[cat].length}</span>
                  <ChevronDown
                    size={16}
                    className={`add-food-category-arrow ${activeCategory === cat ? "add-food-category-arrow-open" : ""}`}
                  />
                </button>
                {activeCategory === cat && (
                  <div className="add-food-category-items">
                    {foodsByCategory[cat].map((food) => (
                      <button
                        key={food.id}
                        className="add-food-result-item"
                        onClick={() => handleSelectFood(food)}
                      >
                        <div className="add-food-result-info">
                          <span className="add-food-result-name">{food.name}</span>
                        </div>
                        <div className="add-food-result-macros">
                          <span>{food.per100g.calories} kcal</span>
                          <span>{food.per100g.protein}g P</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFoodPage;
