import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth, clearAuth } from "../store/authSlice";
import axiosConfig from "../services/axiosConfig";

export default function PricingPage() {
  const { isLoggedIn, user, token } = useSelector(state => state.auth);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState("");

  const handleSubscribe = async () => {
    if (!isLoggedIn) {
      window.location.href = "http://localhost:5000/api/auth/google";
      return;
    }
    setLoading(true);
    try {
      const res = await axiosConfig.post(
        "/api/auth/subscribe",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newUser = { ...user, isPremium: true };
      dispatch(setAuth({ token: res.data.token, user: newUser }));
      setMsg("🎉 Premium unlocked! Redirecting...");
      setTimeout(() => navigate("/learn/ai"), 1500);
    } catch {
      setMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1 className="pricing-title">Simple Pricing</h1>
        <p className="pricing-subtitle">Unlock everything. Pay once. Learn forever.</p>
      </div>

      <div className="pricing-cards">
        {/* Free Plan */}
        <div className="pricing-card">
          <div className="pricing-card__badge pricing-card__badge--free">Free</div>
          <h2 className="pricing-card__price">₹0</h2>
          <p className="pricing-card__period">forever</p>
          <ul className="pricing-card__features">
            <li>✅ Tier 1 — 5 Fundamentals topics</li>
            <li>✅ AI Tutor on free topics</li>
            <li>✅ Quiz on free topics</li>
            <li>❌ Tier 2 & 3 topics</li>
            <li>❌ Advanced AI responses</li>
          </ul>
          <button
            onClick={() => navigate("/learn/ai")}
            className="pricing-card__btn pricing-card__btn--free">
            Get Started Free
          </button>
        </div>

        {/* Premium Plan */}
        <div className="pricing-card pricing-card--premium">
          <div className="pricing-card__badge pricing-card__badge--premium">⭐ Premium</div>
          <h2 className="pricing-card__price">₹499</h2>
          <p className="pricing-card__period">per month</p>
          <ul className="pricing-card__features">
            <li>✅ All 16 CS interview topics</li>
            <li>✅ Tier 1, 2 & 3 unlocked</li>
            <li>✅ AI Tutor on all topics</li>
            <li>✅ Unlimited quiz generation</li>
            <li>✅ Advanced AI explanations</li>
            <li>✅ Progress tracking</li>
          </ul>
          {user?.isPremium ? (
            <button className="pricing-card__btn pricing-card__btn--active" disabled>
              ✅ Already Premium
            </button>
          ) : (
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="pricing-card__btn pricing-card__btn--premium">
              {loading ? "Processing..." : isLoggedIn ? "Subscribe Now" : "Login & Subscribe"}
            </button>
          )}
          {msg && <p className="pricing-card__msg">{msg}</p>}
          <p className="pricing-card__note">
            * Payment integration coming soon. Click to activate demo premium.
          </p>
        </div>
      </div>
    </div>
  );
}