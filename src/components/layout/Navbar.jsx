import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  UtensilsCrossed,
  BarChart3,
  History,
  User,
  LogOut,
  Leaf,
  Menu,
  X,
} from "lucide-react";
import { useState, useCallback } from "react";
import "./Navbar.css";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/add-food", icon: UtensilsCrossed, label: "Add Food" },
  { path: "/history", icon: History, label: "History" },
  { path: "/insights", icon: BarChart3, label: "Insights" },
  { path: "/profile", icon: User, label: "Profile" },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }, [logout, navigate]);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav className="navbar" id="main-navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <div className="navbar-brand" onClick={() => navigate("/")}>
            <div className="navbar-logo">
              <Leaf size={22} />
            </div>
            <span className="navbar-title">NutriTrack<span className="navbar-title-accent">AI</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="navbar-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `navbar-link ${isActive ? "navbar-link-active" : ""}`
                }
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* User Section */}
          <div className="navbar-user">
            <div className="navbar-avatar">
              {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <button className="navbar-logout" onClick={handleLogout} title="Logout">
              <LogOut size={18} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="navbar-mobile-toggle" onClick={toggleMobile}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar-mobile-overlay" onClick={closeMobile}>
          <div className="navbar-mobile-menu animate-slide-in" onClick={(e) => e.stopPropagation()}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `navbar-mobile-link ${isActive ? "navbar-mobile-link-active" : ""}`
                }
                onClick={closeMobile}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
            <button className="navbar-mobile-link navbar-mobile-logout" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
