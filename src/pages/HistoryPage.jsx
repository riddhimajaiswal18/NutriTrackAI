import { useCallback } from "react";
import { useFoodLog } from "../context/FoodLogContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { formatDate, formatDisplayDate } from "../context/utils/formatters";
import { Trash2, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import "./HistoryPage.css";

const HistoryPage = () => {
  const {
    todayLogs,
    loading,
    deleteLog,
    selectedDate,
    setSelectedDate,
    dailyTotals,
  } = useFoodLog();

  // ✅ SAFE DATE HANDLING (NO TIMEZONE BUGS)
  const handlePrevDay = useCallback(() => {
    const d = new Date(selectedDate + "T00:00:00");
    d.setDate(d.getDate() - 1);
    setSelectedDate(formatDate(d));
  }, [selectedDate, setSelectedDate]);

  const handleNextDay = useCallback(() => {
    const today = formatDate();
    const d = new Date(selectedDate + "T00:00:00");
    d.setDate(d.getDate() + 1);

    const next = formatDate(d);
    if (next <= today) {
      setSelectedDate(next);
    }
  }, [selectedDate, setSelectedDate]);

  const handleToday = useCallback(() => {
    setSelectedDate(formatDate());
  }, [setSelectedDate]);

  const isToday = selectedDate === formatDate();

  const handleDelete = useCallback(
    async (logId) => {
      if (window.confirm("Remove this food entry?")) {
        await deleteLog(logId);
      }
    },
    [deleteLog]
  );

  return (
    <div className="history-page">
      <div className="history-header animate-fade-in">
        <h1>Food History</h1>
        <p className="history-subtitle">
          Review your past meals and nutrition
        </p>
      </div>

      {/* Date Selector */}
      <div className="history-date-nav animate-fade-in-up">
        <button className="history-date-btn" onClick={handlePrevDay}>
          <ChevronLeft size={20} />
        </button>

        <div className="history-date-display">
          <Calendar size={16} />
          <span>{formatDisplayDate(selectedDate)}</span>
          {isToday && <span className="history-today-badge">Today</span>}
        </div>

        <button
          className="history-date-btn"
          onClick={handleNextDay}
          disabled={isToday}
        >
          <ChevronRight size={20} />
        </button>

        {!isToday && (
          <Button variant="ghost" size="sm" onClick={handleToday}>
            Today
          </Button>
        )}
      </div>

      {/* Daily Summary */}
      <Card className="history-summary animate-fade-in-up" padding="md">
        <div className="history-summary-grid">
          <div className="history-summary-item">
            <span
              className="history-summary-value"
              style={{ color: "var(--color-calories)" }}
            >
              {Math.round(dailyTotals.calories)}
            </span>
            <span className="history-summary-label">Calories</span>
          </div>

          <div className="history-summary-item">
            <span
              className="history-summary-value"
              style={{ color: "var(--color-protein)" }}
            >
              {Math.round(dailyTotals.protein)}g
            </span>
            <span className="history-summary-label">Protein</span>
          </div>

          <div className="history-summary-item">
            <span
              className="history-summary-value"
              style={{ color: "var(--color-carbs)" }}
            >
              {Math.round(dailyTotals.carbs)}g
            </span>
            <span className="history-summary-label">Carbs</span>
          </div>

          <div className="history-summary-item">
            <span
              className="history-summary-value"
              style={{ color: "var(--color-fat)" }}
            >
              {Math.round(dailyTotals.fat)}g
            </span>
            <span className="history-summary-label">Fat</span>
          </div>
        </div>
      </Card>

      {/* Food List */}
      {loading && <Loader size="md" text="Loading food logs..." />}

      {!loading && todayLogs.length === 0 && (
        <Card className="history-empty" padding="lg">
          <div className="history-empty-content">
            <span className="history-empty-emoji">📋</span>
            <h3>No meals logged</h3>
            <p>No food entries for {formatDisplayDate(selectedDate)}</p>
          </div>
        </Card>
      )}

      {!loading && todayLogs.length > 0 && (
        <div className="history-log-list stagger-children">
          {todayLogs.map((log) => (
            <Card key={log.id} className="history-log-item" padding="md">
              <div className="history-log-item-content">
                <div className="history-log-item-info">
                  <span className="history-log-item-name">
                    {log.foodName}
                  </span>
                  <span className="history-log-item-qty">
                    {log.quantity}g
                  </span>
                </div>

                <div className="history-log-item-macros">
                  <div className="history-macro-tag">
                    {Math.round(log.calories)} kcal
                  </div>
                  <div className="history-macro-tag">
                    {log.protein}g P
                  </div>
                  <div className="history-macro-tag">
                    {log.carbs}g C
                  </div>
                  <div className="history-macro-tag">
                    {log.fat}g F
                  </div>
                </div>

                <button
                  className="history-delete-btn"
                  onClick={() => handleDelete(log.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;