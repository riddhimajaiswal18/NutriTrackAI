import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import {
  addFoodLog as addLogService,
  getFoodLogsByDate,
  deleteFoodLog as deleteLogService,
  updateFoodLog as updateLogService,
  getWeeklyFoodLogs as getWeeklyService,
} from "../services/firestoreService";
import { formatDate } from "../utils/formatters";

const FoodLogContext = createContext(null);

export const useFoodLog = () => {
  const context = useContext(FoodLogContext);
  if (!context) throw new Error("useFoodLog must be used within FoodLogProvider");
  return context;
};

// ─── STATE ────────────────────────────────────────────────

const initialState = {
  todayLogs: [],
  weeklyLogs: [],
  loading: true,
  selectedDate: formatDate(),
};

// ─── REDUCER ──────────────────────────────────────────────

const foodLogReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODAY_LOGS":
      return { ...state, todayLogs: action.payload, loading: false };

    case "SET_WEEKLY_LOGS":
      return { ...state, weeklyLogs: action.payload };

    case "ADD_LOG":
      return {
        ...state,
        todayLogs: [action.payload, ...state.todayLogs],
      };

    case "DELETE_LOG":
      return {
        ...state,
        todayLogs: state.todayLogs.filter(
          (log) => log.id !== action.payload
        ),
      };

    case "UPDATE_LOG":
      return {
        ...state,
        todayLogs: state.todayLogs.map((log) =>
          log.id === action.payload.id
            ? { ...log, ...action.payload.data }
            : log
        ),
      };

   case "SET_DATE":
  return {
    ...state,
    selectedDate: action.payload,
    loading: true
  };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

// ─── PROVIDER ─────────────────────────────────────────────

export const FoodLogProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(foodLogReducer, initialState);

  // ─── FETCH TODAY LOGS ───────────────────────────────────

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user) {
        dispatch({ type: "SET_TODAY_LOGS", payload: [] });
        return;
      }

      try {
        dispatch({ type: "SET_LOADING", payload: true });

        const logs = await getFoodLogsByDate(
          user.uid,
          state.selectedDate
        );

        dispatch({ type: "SET_TODAY_LOGS", payload: logs });
      } catch (err) {
        console.error("Error fetching food logs:", err);
        dispatch({ type: "SET_TODAY_LOGS", payload: [] });
      }
    };

    fetchLogs();
  }, [user, state.selectedDate]);

  // ─── FETCH WEEKLY LOGS (FIXED) ───────────────────────────

  const fetchWeeklyLogs = useCallback(async () => {
    if (!user) return [];

    try {
      const logs = await getWeeklyService(user.uid);

      console.log("Weekly logs:", logs); // debug

      dispatch({
        type: "SET_WEEKLY_LOGS",
        payload: logs,
      });

      return logs;
    } catch (err) {
      console.error("Error fetching weekly logs:", err);
      dispatch({
        type: "SET_WEEKLY_LOGS",
        payload: [],
      });
      return [];
    }
  }, [user]);

  // ─── ADD LOG ─────────────────────────────────────────────

  const addLog = useCallback(
    async (entry) => {
      if (!user) return;

      const id = await addLogService(user.uid, {
        ...entry,
        date: state.selectedDate,
      });

      dispatch({
        type: "ADD_LOG",
        payload: { id, ...entry, date: state.selectedDate },
      });
    },
    [user, state.selectedDate]
  );

  // ─── DELETE LOG ──────────────────────────────────────────

  const deleteLog = useCallback(
    async (logId) => {
      if (!user) return;

      await deleteLogService(user.uid, logId);

      dispatch({
        type: "DELETE_LOG",
        payload: logId,
      });
    },
    [user]
  );

  // ─── UPDATE LOG ──────────────────────────────────────────

  const updateLog = useCallback(
    async (logId, data) => {
      if (!user) return;

      await updateLogService(user.uid, logId, data);

      dispatch({
        type: "UPDATE_LOG",
        payload: { id: logId, data },
      });
    },
    [user]
  );

  // ─── DATE CHANGE ─────────────────────────────────────────

  const setSelectedDate = useCallback((date) => {
    dispatch({ type: "SET_DATE", payload: date });
  }, []);

  // ─── DAILY TOTALS ────────────────────────────────────────

  const dailyTotals = useMemo(() => {
    return state.todayLogs.reduce(
      (acc, log) => ({
        calories: acc.calories + (log.calories || 0),
        protein: acc.protein + (log.protein || 0),
        carbs: acc.carbs + (log.carbs || 0),
        fat: acc.fat + (log.fat || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [state.todayLogs]);

  // ─── CONTEXT VALUE ───────────────────────────────────────

  const value = {
    todayLogs: state.todayLogs,
    weeklyLogs: state.weeklyLogs,
    loading: state.loading,
    selectedDate: state.selectedDate,
    dailyTotals,
    addLog,
    deleteLog,
    updateLog,
    setSelectedDate,
    fetchWeeklyLogs,
  };

  return (
    <FoodLogContext.Provider value={value}>
      {children}
    </FoodLogContext.Provider>
  );
};

export default FoodLogContext;