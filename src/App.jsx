import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { UserProfileProvider } from "./context/UserProfileContext";
import { FoodLogProvider } from "./context/FoodLogContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import DashboardPage from "./pages/DashboardPage";
import AddFoodPage from "./pages/AddFoodPage";
import HistoryPage from "./pages/HistoryPage";
import InsightsPage from "./pages/InsightsPage";
import "./App.css";

// Redirect authenticated users away from auth pages
const AuthRedirect = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProfileProvider>
          <FoodLogProvider>
            <Routes>
              {/* Public routes */}
              <Route
                path="/login"
                element={
                  <AuthRedirect>
                    <LoginPage />
                  </AuthRedirect>
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthRedirect>
                    <SignupPage />
                  </AuthRedirect>
                }
              />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfileSetupPage />} />
                  <Route path="/add-food" element={<AddFoodPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                </Route>
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </FoodLogProvider>
        </UserProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
