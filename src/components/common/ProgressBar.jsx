import "./ProgressBar.css";

const ProgressBar = ({
  value = 0,
  max = 100,
  color,
  label,
  showValue = true,
  size = "md",
  animated = true,
}) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const barColor = color || (percentage >= 90 ? "var(--color-success)" : percentage >= 60 ? "var(--accent-secondary)" : percentage >= 30 ? "var(--color-warning)" : "var(--color-danger)");

  return (
    <div className={`progress-wrapper progress-${size}`}>
      {(label || showValue) && (
        <div className="progress-header">
          {label && <span className="progress-label">{label}</span>}
          {showValue && (
            <span className="progress-value">
              {value} / {max}
            </span>
          )}
        </div>
      )}
      <div className="progress-track">
        <div
          className={`progress-fill ${animated ? "progress-animated" : ""}`}
          style={{
            width: `${percentage}%`,
            background: barColor,
            boxShadow: `0 0 10px ${barColor}40`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
