import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../context/UserProfileContext";
import { useAuth } from "../context/AuthContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { calculateBMI, getBMICategory, calculateDailyTargets } from "../utils/nutritionCalc";
import {
  User, Ruler, Weight, Activity, Target, ChevronRight, ChevronLeft, Check, Zap
} from "lucide-react";
import "./ProfileSetupPage.css";

const STEPS = ["Personal", "Body", "Activity", "Goal"];

const ProfileSetupPage = () => {
  const { user } = useAuth();
  const { profile, createProfile, updateProfile, hasProfile } = useUserProfile();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || user?.displayName || "",
    age: profile?.age || "",
    gender: profile?.gender || "male",
    height: profile?.height || "",
    weight: profile?.weight || "",
    activityLevel: profile?.activityLevel || "moderate",
    goal: profile?.goal || "maintain",
  });

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const bmi = useMemo(() => {
    if (!formData.weight || !formData.height) return null;
    const val = calculateBMI(Number(formData.weight), Number(formData.height));
    return { value: val, ...getBMICategory(val) };
  }, [formData.weight, formData.height]);

  const targets = useMemo(() => {
    if (!formData.weight || !formData.height || !formData.age) return null;
    return calculateDailyTargets({
      weight: Number(formData.weight),
      height: Number(formData.height),
      age: Number(formData.age),
      gender: formData.gender,
      activityLevel: formData.activityLevel,
      goal: formData.goal,
    });
  }, [formData]);

  const canProceed = useMemo(() => {
    switch (step) {
      case 0: return formData.name && formData.age && formData.gender;
      case 1: return formData.height && formData.weight;
      case 2: return formData.activityLevel;
      case 3: return formData.goal;
      default: return false;
    }
  }, [step, formData]);

  const handleSubmit = useCallback(async () => {
  try {
    setSaving(true);

    const data = {
      name: formData.name,
      age: Number(formData.age),
      gender: formData.gender,
      height: Number(formData.height),
      weight: Number(formData.weight),
      activityLevel: formData.activityLevel,
      goal: formData.goal,
    };

    if (hasProfile) {
      await updateProfile(data);
    } else {
      await createProfile(data);
    }

    // 🔥 IMPORTANT: wait a bit OR refetch before navigating
    await new Promise((res) => setTimeout(res, 500));

    navigate("/");
  } catch (err) {
    console.error("Error saving profile:", err);
  } finally {
    setSaving(false);
  }
}, [formData, hasProfile, createProfile, updateProfile, navigate]);

  return (
    <div className="profile-setup">
      <div className="profile-setup-header animate-fade-in">
        <h1 className="profile-setup-title">
          {hasProfile ? "Update Your Profile" : "Set Up Your Profile"}
        </h1>
        <p className="profile-setup-subtitle">
          We'll use this to calculate your personalized nutrition targets
        </p>
      </div>

      {/* Step Indicator */}
      <div className="profile-steps animate-fade-in">
        {STEPS.map((s, i) => (
          <div key={s} className={`profile-step ${i === step ? "profile-step-active" : i < step ? "profile-step-done" : ""}`}>
            <div className="profile-step-dot">
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className="profile-step-label">{s}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="profile-form-card animate-fade-in-up" padding="lg">
        {step === 0 && (
          <div className="profile-form-step">
            <div className="profile-form-step-header">
              <User size={24} className="profile-form-step-icon" />
              <h2>Personal Information</h2>
            </div>
            <div className="profile-form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Age</label>
                <input
                  className="form-input"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  placeholder="25"
                  min="10"
                  max="100"
                />
              </div>
              <div className="form-group form-group-full">
                <label className="form-label">Gender</label>
                <div className="profile-gender-picker">
                  {["male", "female"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={`profile-gender-btn ${formData.gender === g ? "profile-gender-btn-active" : ""}`}
                      onClick={() => handleChange("gender", g)}
                    >
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="profile-form-step">
            <div className="profile-form-step-header">
              <Ruler size={24} className="profile-form-step-icon" />
              <h2>Body Measurements</h2>
            </div>
            <div className="profile-form-grid">
              <div className="form-group">
                <label className="form-label">Height (cm)</label>
                <input
                  className="form-input"
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  placeholder="170"
                  min="100"
                  max="250"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Weight (kg)</label>
                <input
                  className="form-input"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  placeholder="70"
                  min="20"
                  max="300"
                />
              </div>
            </div>
            {bmi && (
              <div className="profile-bmi-card animate-fade-in">
                <span className="profile-bmi-label">Your BMI</span>
                <span className="profile-bmi-value" style={{ color: bmi.color }}>
                  {bmi.value}
                </span>
                <span className="profile-bmi-category" style={{ color: bmi.color }}>
                  {bmi.label}
                </span>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="profile-form-step">
            <div className="profile-form-step-header">
              <Activity size={24} className="profile-form-step-icon" />
              <h2>Activity Level</h2>
            </div>
            <div className="profile-activity-grid">
              {[
                { value: "sedentary", label: "Sedentary", desc: "Little or no exercise", emoji: "🪑" },
                { value: "moderate", label: "Moderate", desc: "Exercise 3-5 days/week", emoji: "🚶" },
                { value: "active", label: "Active", desc: "Exercise 6-7 days/week", emoji: "🏃" },
                { value: "very_active", label: "Very Active", desc: "Intense daily exercise", emoji: "💪" },
              ].map((a) => (
                <button
                  key={a.value}
                  type="button"
                  className={`profile-activity-card ${formData.activityLevel === a.value ? "profile-activity-card-active" : ""}`}
                  onClick={() => handleChange("activityLevel", a.value)}
                >
                  <span className="profile-activity-emoji">{a.emoji}</span>
                  <span className="profile-activity-label">{a.label}</span>
                  <span className="profile-activity-desc">{a.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="profile-form-step">
            <div className="profile-form-step-header">
              <Target size={24} className="profile-form-step-icon" />
              <h2>Your Goal</h2>
            </div>
            <div className="profile-goal-grid">
              {[
                { value: "lose", label: "Lose Weight", desc: "Calorie deficit (-500 kcal)", emoji: "📉" },
                { value: "maintain", label: "Maintain", desc: "Stay at current weight", emoji: "⚖️" },
                { value: "gain", label: "Gain Weight", desc: "Calorie surplus (+500 kcal)", emoji: "📈" },
              ].map((g) => (
                <button
                  key={g.value}
                  type="button"
                  className={`profile-goal-card ${formData.goal === g.value ? "profile-goal-card-active" : ""}`}
                  onClick={() => handleChange("goal", g.value)}
                >
                  <span className="profile-goal-emoji">{g.emoji}</span>
                  <span className="profile-goal-label">{g.label}</span>
                  <span className="profile-goal-desc">{g.desc}</span>
                </button>
              ))}
            </div>

            {targets && (
              <div className="profile-targets-preview animate-fade-in">
                <div className="profile-targets-header">
                  <Zap size={18} />
                  <span>Your Daily Targets</span>
                </div>
                <div className="profile-targets-grid">
                  <div className="profile-target-item">
                    <span className="profile-target-value" style={{ color: "var(--color-calories)" }}>{targets.calories}</span>
                    <span className="profile-target-label">Calories</span>
                  </div>
                  <div className="profile-target-item">
                    <span className="profile-target-value" style={{ color: "var(--color-protein)" }}>{targets.protein}g</span>
                    <span className="profile-target-label">Protein</span>
                  </div>
                  <div className="profile-target-item">
                    <span className="profile-target-value" style={{ color: "var(--color-carbs)" }}>{targets.carbs}g</span>
                    <span className="profile-target-label">Carbs</span>
                  </div>
                  <div className="profile-target-item">
                    <span className="profile-target-value" style={{ color: "var(--color-fat)" }}>{targets.fat}g</span>
                    <span className="profile-target-label">Fat</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="profile-form-nav">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)} icon={ChevronLeft}>
              Back
            </Button>
          )}
          <div style={{ flex: 1 }} />
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed} icon={ChevronRight}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} loading={saving} disabled={!canProceed}>
              {hasProfile ? "Update Profile" : "Complete Setup"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProfileSetupPage;
