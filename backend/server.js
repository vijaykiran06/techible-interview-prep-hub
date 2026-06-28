import "dotenv/config";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import aiTopicRoutes from "./routes/aiTopicRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";

const companyRoutes = require("./routes/companyRoutes.cjs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server running" });
});

// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/ai-topics", aiTopicRoutes);
app.use("/api/ai-chat", aiChatRoutes);

// Connect DB + Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error("❌ DB connection failed:", err));