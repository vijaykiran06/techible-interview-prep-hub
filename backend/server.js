import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import aiTopicRoutes from "./routes/aiTopicRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/ai-topics", aiTopicRoutes);
app.use("/api/ai-chat", aiChatRoutes);

// Connect DB + Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(` Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error(" DB connection failed:", err));