/**
 * Format a date object to YYYY-MM-DD string
 */
export const formatDate = (date = new Date()) => {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // ✅ ALWAYS YYYY-MM-DD
};

/**
 * Format date for display (e.g., "Mon, Apr 20")
 */
export const formatDisplayDate = (dateStr) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

/**
 * Get greeting based on time of day
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

/**
 * Format number with commas
 */
export const formatNumber = (num) => {
  return Math.round(num).toLocaleString();
};

/**
 * Get last N days as YYYY-MM-DD strings
 */
export const getLastNDays = (n) => {
  const dates = [];

  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
};

/**
 * Get short day name from date string
 */
export const getShortDay = (dateStr) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { weekday: "short" });
};
