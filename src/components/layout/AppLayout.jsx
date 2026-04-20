import { Outlet, Navigate } from "react-router-dom";
import { useUserProfile } from "../../context/UserProfileContext";
import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar";
import Loader from "../common/Loader";
import "./AppLayout.css";

const AppLayout = () => {
  const { user } = useAuth();
  const { hasProfile, profileLoading } = useUserProfile();

  if (profileLoading) {
    return <Loader size="lg" text="Loading your profile..." />;
  }

  // If user has no profile, redirect to profile setup
  // But only if not already on the profile page
  if (user && !hasProfile && window.location.pathname !== "/profile") {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <div className="app-content container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
