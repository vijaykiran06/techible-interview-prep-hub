import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../store/authSlice";

export default function AiNavbar() {
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/learn/ai");
  };

  return (
    <nav className="ai-navbar">
      <span
        onClick={() => navigate("/learn/ai")}
        className="ai-navbar__brand">
        🧠 AI Hub
      </span>

      <div className="ai-navbar__right">
        <button
          onClick={() => navigate("/pricing")}
          className="ai-navbar__pricing-btn">
          Pricing
        </button>

        {isLoggedIn ? (
          <div className="ai-navbar__user">
            {user?.avatar && (
              <img src={user.avatar} alt="avatar" className="ai-navbar__avatar" />
            )}
            <span className="ai-navbar__name">{user?.name}</span>
            {user?.isPremium && (
              <span className="ai-navbar__premium-badge">⭐ Premium</span>
            )}
            <button onClick={handleLogout} className="ai-navbar__logout">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="ai-navbar__login">
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
}