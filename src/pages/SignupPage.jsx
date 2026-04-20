import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import { Leaf, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import "./AuthPages.css";

const SignupPage = () => {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await signup(email, password, name);
      navigate("/profile");
    } catch (err) {
      setError(
        err.code === "auth/email-already-in-use"
          ? "An account with this email already exists"
          : err.code === "auth/weak-password"
          ? "Password is too weak"
          : "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [name, email, password, confirmPassword, signup, navigate]);

  const handleGoogleSignup = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithGoogle();
      navigate("/profile");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [loginWithGoogle, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-bg-glow auth-bg-glow-1"></div>
      <div className="auth-bg-glow auth-bg-glow-2"></div>

      <div className="auth-container animate-fade-in-up">
        <div className="auth-header">
          <div className="auth-logo">
            <Leaf size={28} />
          </div>
          <h1 className="auth-title">
            Join <span className="gradient-text">NutriTrack AI</span>
          </h1>
          <p className="auth-subtitle">Start your personalized nutrition journey</p>
        </div>

        {error && (
          <div className="auth-error animate-fade-in">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="signup-name">Full Name</label>
            <div className="auth-input-wrapper">
              <User size={18} className="auth-input-icon" />
              <input
                id="signup-name"
                type="text"
                className="form-input auth-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">Email</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input
                id="signup-email"
                type="email"
                className="form-input auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                className="form-input auth-input"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="form-group">
            <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input
                id="signup-confirm"
                type="password"
                className="form-input auth-input"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" fullWidth loading={loading} size="lg">
            Create Account
          </Button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>

        <Button variant="google" fullWidth onClick={handleGoogleSignup} disabled={loading} size="lg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </Button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
