import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUserProfile } from "../context/UserProfileContext";
import { useFoodLog } from "../context/FoodLogContext";
import useNutritionCalc from "../hooks/useNutritionCalc";
import Card from "../components/common/Card";
import CircularProgress from "../components/common/CircularProgress";
import ProgressBar from "../components/common/ProgressBar";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { getGreeting, formatDisplayDate } from "../utils/formatters";
import {
  Plus, Flame, Beef, Wheat, Droplets, Trash2, Lightbulb, TrendingUp, UtensilsCrossed,
} from "lucide-react";
import "./DashboardPage.css";

const macroIcons = {
  calories: Flame,
  protein: Beef,
  carbs: Wheat,
  fat: Droplets,
};

const macroLabels = {
  calories: "Calories",
  protein: "Protein",
  carbs: "Carbs",
  fat: "Fat",
};

const macroUnits = {
  calories: "kcal",
  protein: "g",
  carbs: "g",
  fat: "g",
};

const DashboardPage = () => {
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const { todayLogs, loading, deleteLog, selectedDate } = useFoodLog();
  const { progress, suggestions, overallScore } = useNutritionCalc();
  const navigate = useNavigate();

  const handleDelete = useCallback(async (logId) => {
    if (window.confirm("Remove this food entry?")) {
      await deleteLog(logId);
    }
  }, [deleteLog]);

  const displayName = profile?.name || user?.displayName || "there";

  if (loading) {
    return <Loader size="lg" text="Loading your dashboard..." />;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header animate-fade-in">
        <div>
          <h1 className="dashboard-greeting">
            {getGreeting()}, <span className="gradient-text">{displayName}</span> 👋
          </h1>
          <p className="dashboard-date">{formatDisplayDate(selectedDate)}</p>
        </div>
        <Button onClick={() => navigate("/add-food")} icon={Plus}>
          Add Food
        </Button>
      </div>

      {/* Overall Score */}
      <div className="dashboard-score-section animate-fade-in-up">
        <Card variant="gradient" padding="lg" glow className="dashboard-score-card">
          <div className="dashboard-score-content">
            <CircularProgress
              value={overallScore}
              max={100}
              size={140}
              strokeWidth={10}
              color="var(--accent-primary)"
            >
              <span className="dashboard-score-value">{overallScore}%</span>
              <span className="dashboard-score-label">Daily Goal</span>
            </CircularProgress>
            <div className="dashboard-score-info">
              <h2>Today's Progress</h2>
              <p className="dashboard-score-desc">
                {overallScore >= 90
                  ? "🎉 Amazing! You've nearly hit all your targets!"
                  : overallScore >= 60
                  ? "💪 Good progress! Keep going!"
                  : overallScore >= 30
                  ? "🍽️ You're getting there. Log more meals."
                  : "📝 Start logging your meals to track progress."}
              </p>
              <div className="dashboard-quick-stats">
                <div className="dashboard-quick-stat">
                  <Flame size={16} style={{ color: "var(--color-calories)" }} />
                  <span>{progress.calories.current} / {progress.calories.target} kcal</span>
                </div>
                <div className="dashboard-quick-stat">
                  <Beef size={16} style={{ color: "var(--color-protein)" }} />
                  <span>{progress.protein.current} / {progress.protein.target}g protein</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Macro Cards */}
      <div className="dashboard-macros stagger-children">
        {["calories", "protein", "carbs", "fat"].map((key) => {
          const Icon = macroIcons[key];
          const p = progress[key];
          return (
            <Card key={key} className="dashboard-macro-card" padding="md">
              <div className="dashboard-macro-header">
                <div className="dashboard-macro-icon" style={{ color: `var(--color-${key})` }}>
                  <Icon size={20} />
                </div>
                <span className="dashboard-macro-label">{macroLabels[key]}</span>
              </div>
              <div className="dashboard-macro-value">
                {p.current} <span className="dashboard-macro-unit">{macroUnits[key]}</span>
              </div>
              <ProgressBar
                value={p.current}
                max={p.target}
                color={`var(--color-${key})`}
                showValue={false}
                size="sm"
              />
              <div className="dashboard-macro-remaining">
                {p.remaining > 0
                  ? `${p.remaining} ${macroUnits[key]} remaining`
                  : "Target reached ✓"}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Smart Suggestions */}
      {suggestions.length > 0 && (
        <div className="dashboard-suggestions animate-fade-in-up">
          <div className="dashboard-section-header">
            <Lightbulb size={20} className="dashboard-section-icon" />
            <h2>Smart Suggestions</h2>
          </div>
          <div className="dashboard-suggestion-list">
            {suggestions.slice(0, 3).map((s, i) => (
              <Card key={i} className="dashboard-suggestion-card" padding="md">
                <div className="dashboard-suggestion-content">
                  <span className="dashboard-suggestion-emoji">💡</span>
                  <div>
                    <p className="dashboard-suggestion-text">
                      Try <strong>{s.food.name}</strong> ({s.suggestedQuantity}g)
                    </p>
                    <p className="dashboard-suggestion-detail">
                      +{s.nutrition.protein}g protein · {s.nutrition.calories} kcal
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Today's Food Log */}
      <div className="dashboard-log animate-fade-in-up">
        <div className="dashboard-section-header">
          <UtensilsCrossed size={20} className="dashboard-section-icon" />
          <h2>Today's Log</h2>
          <span className="dashboard-log-count">{todayLogs.length} items</span>
        </div>

        {todayLogs.length === 0 ? (
          <Card className="dashboard-empty" padding="lg">
            <div className="dashboard-empty-content">
              <span className="dashboard-empty-emoji">🍽️</span>
              <h3>No meals logged yet</h3>
              <p>Start tracking by adding your first meal</p>
              <Button onClick={() => navigate("/add-food")} icon={Plus} size="sm">
                Add Food
              </Button>
            </div>
          </Card>
        ) : (
          <div className="dashboard-log-list stagger-children">
            {todayLogs.map((log) => (
              <Card key={log.id} className="dashboard-log-item" padding="sm">
                <div className="dashboard-log-item-content">
                  <div className="dashboard-log-item-info">
                    <span className="dashboard-log-item-name">{log.foodName}</span>
                    <span className="dashboard-log-item-qty">{log.quantity}g</span>
                  </div>
                  <div className="dashboard-log-item-macros">
                    <span style={{ color: "var(--color-calories)" }}>{Math.round(log.calories)} kcal</span>
                    <span style={{ color: "var(--color-protein)" }}>{log.protein}g P</span>
                    <span style={{ color: "var(--color-carbs)" }}>{log.carbs}g C</span>
                    <span style={{ color: "var(--color-fat)" }}>{log.fat}g F</span>
                  </div>
                  <button
                    className="dashboard-log-item-delete"
                    onClick={() => handleDelete(log.id)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
