import "./Card.css";

const Card = ({ children, className = "", variant = "default", padding = "md", onClick, glow = false }) => {
  return (
    <div
      className={`card card-${variant} card-p-${padding} ${glow ? "card-glow" : ""} ${onClick ? "card-clickable" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
