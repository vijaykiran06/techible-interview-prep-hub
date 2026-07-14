import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import aiTopicRoutes from "./routes/aiTopicRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import interviewPrepRoutes from "./routes/interviewPrepRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server running",
  });
});

// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/ai-topics", aiTopicRoutes);
app.use("/api/ai-chat", aiChatRoutes);
app.use("/api/interview-prep", interviewPrepRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
  });