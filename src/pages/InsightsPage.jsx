import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useFoodLog } from "../context/FoodLogContext";
import { useUserProfile } from "../context/UserProfileContext";
import Card from "../components/common/Card";
import Loader from "../components/common/Loader";
import ProgressBar from "../components/common/ProgressBar";
import { getLastNDays, getShortDay } from "../utils/formatters";
import {
  BarChart3, TrendingUp, TrendingDown, AlertTriangle, Award, Target,
} from "lucide-react";
import "./InsightsPage.css";

// Lazy-loaded chart component
const LazyChart = lazy(() => import("./InsightsChart"));

const InsightsPage = () => {
  const { fetchWeeklyLogs, weeklyLogs } = useFoodLog();
  const { dailyTargets } = useUserProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchWeeklyLogs();
      setLoading(false);
    };
    load();
  }, [fetchWeeklyLogs]);

  // Process weekly data
  const weeklyData = useMemo(() => {
    const days = getLastNDays(7).reverse();
    return days.map((date) => {
     const dayLogs = weeklyLogs.filter((log) => {
        if (!log.timestamp || !log.timestamp.seconds) return false;
        const logDate = new Date(log.timestamp.seconds * 1000);
        const formatted = logDate.toLocaleDateString("en-CA"); // YYYY-MM-DD
        return formatted === date;
      });
      const totals = dayLogs.reduce(
        (acc, log) => ({
          calories: acc.calories + (log.calories || 0),
          protein: acc.protein + (log.protein || 0),
          carbs: acc.carbs + (log.carbs || 0),
          fat: acc.fat + (log.fat || 0),
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );
      return {
        date,
        day: getShortDay(date),
        ...totals,
        count: dayLogs.length,
      };
    });
  }, [weeklyLogs]);

  // Weekly averages
  const averages = useMemo(() => {
    const daysWithData = weeklyData.filter((d) => d.count > 0);
    if (daysWithData.length === 0) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    return {
      calories: Math.round(daysWithData.reduce((s, d) => s + d.calories, 0) / daysWithData.length),
      protein: Math.round(daysWithData.reduce((s, d) => s + d.protein, 0) / daysWithData.length),
      carbs: Math.round(daysWithData.reduce((s, d) => s + d.carbs, 0) / daysWithData.length),
      fat: Math.round(daysWithData.reduce((s, d) => s + d.fat, 0) / daysWithData.length),
    };
  }, [weeklyData]);

  // Deficiencies
  const deficiencies = useMemo(() => {
    const issues = [];
    const daysWithData = weeklyData.filter((d) => d.count > 0);
    if (daysWithData.length < 3) return issues;

    const lowProteinDays = daysWithData.filter((d) => d.protein < dailyTargets.protein * 0.6).length;
    if (lowProteinDays >= 3) {
      issues.push({
        type: "protein",
        message: `You were low on protein ${lowProteinDays} out of ${daysWithData.length} days`,
        severity: "high",
      });
    }

    const lowCalDays = daysWithData.filter((d) => d.calories < dailyTargets.calories * 0.5).length;
    if (lowCalDays >= 3) {
      issues.push({
        type: "calories",
        message: `You under-ate ${lowCalDays} out of ${daysWithData.length} days`,
        severity: "medium",
      });
    }

    const overCalDays = daysWithData.filter((d) => d.calories > dailyTargets.calories * 1.3).length;
    if (overCalDays >= 3) {
      issues.push({
        type: "calories_over",
        message: `You exceeded calorie targets ${overCalDays} days this week`,
        severity: "medium",
      });
    }

    return issues;
  }, [weeklyData, dailyTargets]);

  // Streak
  const streak = useMemo(() => {
    let count = 0;
    const reversed = [...weeklyData].reverse();
    for (const day of reversed) {
      if (day.count > 0) count++;
      else break;
    }
    return count;
  }, [weeklyData]);

  if (loading) {
    return <Loader size="lg" text="Analyzing your nutrition data..." />;
  }

  const hasData = weeklyData.some((d) => d.count > 0);

  return (
    <div className="insights-page">
      <div className="insights-header animate-fade-in">
        <h1>Weekly Insights</h1>
        <p className="insights-subtitle">Your nutrition patterns over the last 7 days</p>
      </div>

      {!hasData ? (
        <Card className="insights-empty" padding="lg">
          <div className="insights-empty-content">
            <span className="insights-empty-emoji">📊</span>
            <h3>No data yet</h3>
            <p>Start logging meals to see your weekly insights and trends</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Stats Row */}
          <div className="insights-stats stagger-children">
            <Card className="insights-stat-card" padding="md">
              <div className="insights-stat-icon" style={{ color: "var(--accent-primary)" }}>
                <Award size={22} />
              </div>
              <div className="insights-stat-value">{streak}</div>
              <div className="insights-stat-label">Day Streak</div>
            </Card>
            <Card className="insights-stat-card" padding="md">
              <div className="insights-stat-icon" style={{ color: "var(--color-calories)" }}>
                <Target size={22} />
              </div>
              <div className="insights-stat-value">{averages.calories}</div>
              <div className="insights-stat-label">Avg. Calories</div>
            </Card>
            <Card className="insights-stat-card" padding="md">
              <div className="insights-stat-icon" style={{ color: "var(--color-protein)" }}>
                <TrendingUp size={22} />
              </div>
              <div className="insights-stat-value">{averages.protein}g</div>
              <div className="insights-stat-label">Avg. Protein</div>
            </Card>
          </div>

          {/* Chart */}
          <Card className="insights-chart-card animate-fade-in-up" padding="lg">
            <div className="insights-chart-header">
              <BarChart3 size={20} className="insights-chart-icon" />
              <h2>Weekly Overview</h2>
            </div>
            <Suspense fallback={<Loader size="md" text="Loading chart..." />}>
              <LazyChart data={weeklyData} targets={dailyTargets} />
            </Suspense>
          </Card>

          {/* Averages vs Targets */}
          <Card className="insights-averages animate-fade-in-up" padding="lg">
            <h2 className="insights-section-title">Averages vs Targets</h2>
            <div className="insights-avg-list">
              <ProgressBar
                label="Calories"
                value={averages.calories}
                max={dailyTargets.calories}
                color="var(--color-calories)"
                size="md"
              />
              <ProgressBar
                label="Protein"
                value={averages.protein}
                max={dailyTargets.protein}
                color="var(--color-protein)"
                size="md"
              />
              <ProgressBar
                label="Carbs"
                value={averages.carbs}
                max={dailyTargets.carbs}
                color="var(--color-carbs)"
                size="md"
              />
              <ProgressBar
                label="Fat"
                value={averages.fat}
                max={dailyTargets.fat}
                color="var(--color-fat)"
                size="md"
              />
            </div>
          </Card>

          {/* Deficiencies */}
          {deficiencies.length > 0 && (
            <div className="insights-deficiencies animate-fade-in-up">
              <h2 className="insights-section-title">
                <AlertTriangle size={20} style={{ color: "var(--color-warning)" }} />
                Attention Needed
              </h2>
              <div className="insights-deficiency-list">
                {deficiencies.map((d, i) => (
                  <Card key={i} className="insights-deficiency-card" padding="md">
                    <div className="insights-deficiency-content">
                      <AlertTriangle size={18} style={{ color: d.severity === "high" ? "var(--color-danger)" : "var(--color-warning)" }} />
                      <p>{d.message}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InsightsPage;
