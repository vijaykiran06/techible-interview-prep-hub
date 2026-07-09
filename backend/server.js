import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import aiTopicRoutes from "./routes/aiTopicRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";
import companyRoutes from "./routes/companyRoutes.js"; 
import interviewPrepRoutes from "./routes/interviewPrepRoutes.js";

const app = express();
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server running" });
});

<<<<<<< HEAD
app.use("/api/companies", companyRoutes); 
app.use("/api/ai-topics", aiTopicRoutes);
app.use("/api/ai-chat", aiChatRoutes);
=======
// Routes
app.use("/api/companies", companyRoutes);
app.use("/api/ai-topics", aiTopicRoutes);
app.use("/api/ai-chat", aiChatRoutes);

app.use('/api/companies', companyRoutes);
>>>>>>> f0e1df1a0b6e18466ef09f1446f4e3e7ee22a432
app.use('/api/interview-prep', interviewPrepRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
<<<<<<< HEAD
    console.log(" MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    }); 
  })
  .catch(err => console.error(" DB connection failed:", err));
=======
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`);

    console.log('MongoDB Connected');
 
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server running on port ${
          process.env.PORT || 3000
        }`
      );
    });
  })
  .catch(err => console.error("❌ DB connection failed:", err));
>>>>>>> f0e1df1a0b6e18466ef09f1446f4e3e7ee22a432
