import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const router = express.Router();

// Setup Google Strategy
passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  "http://localhost:5000/api/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name:     profile.displayName,
        email:    profile.emails[0].value,
        avatar:   profile.photos[0].value,
      });
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// GET /api/auth/google
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

// GET /api/auth/google/callback
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/learn/ai" }),
  (req, res) => {
    const token = jwt.sign(
      {
        id:        req.user._id,
        name:      req.user.name,
        email:     req.user.email,
        avatar:    req.user.avatar,
        isPremium: req.user.isPremium,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
  }
);

// GET /api/auth/me — verify token
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: { id: user._id, name: user.name, email: user.email, avatar: user.avatar, isPremium: user.isPremium } });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// POST /api/auth/subscribe — fake subscribe, sets isPremium true
router.post("/subscribe", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Not logged in" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { isPremium: true, premiumSince: new Date() },
      { new: true }
    );
    const newToken = jwt.sign(
      { id: user._id, name: user.name, email: user.email, avatar: user.avatar, isPremium: true },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ success: true, token: newToken, message: "Premium unlocked!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out" });
});

export default router;