import "./CircularProgress.css";

const CircularProgress = ({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color,
  label,
  unit = "",
  children,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const barColor = color || (percentage >= 90 ? "var(--color-success)" : percentage >= 60 ? "var(--accent-secondary)" : percentage >= 30 ? "var(--color-warning)" : "var(--color-danger)");

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          className="circular-progress-bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={barColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            filter: `drop-shadow(0 0 6px ${barColor})`,
          }}
        />
      </svg>
      <div className="circular-progress-content">
        {children || (
          <>
            <span className="circular-progress-value">{Math.round(value)}</span>
            {unit && <span className="circular-progress-unit">{unit}</span>}
            {label && <span className="circular-progress-label">{label}</span>}
          </>
        )}
      </div>
    </div>
  );
};

export default CircularProgress;
