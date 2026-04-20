import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./AuthPages.css";

const LoginPage = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(
        err.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : err.code === "auth/user-not-found"
          ? "No account found with this email"
          : "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [email, password, login, navigate]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [loginWithGoogle, navigate]);

  return (
    <div className="auth-page">
      {/* Background decoration */}
      <div className="auth-bg-glow auth-bg-glow-1"></div>
      <div className="auth-bg-glow auth-bg-glow-2"></div>

      <div className="auth-container animate-fade-in-up">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">
            <Leaf size={28} />
          </div>
          <h1 className="auth-title">
            Welcome back to <span className="gradient-text">NutriTrack AI</span>
          </h1>
          <p className="auth-subtitle">Sign in to track your nutrition journey</p>
        </div>

        {/* Error */}
        {error && (
          <div className="auth-error animate-fade-in">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                id="login-email"
                type="email"
                className="form-input auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                className="form-input auth-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-input-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" fullWidth loading={loading} size="lg">
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        {/* Google */}
        <Button
          variant="google"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={loading}
          size="lg"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </Button>

        {/* Footer */}
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
