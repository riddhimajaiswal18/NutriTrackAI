import { Loader2 } from "lucide-react";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? "btn-full" : ""} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <Loader2 className="btn-spinner" size={18} />
      ) : Icon ? (
        <Icon size={18} />
      ) : null}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;
