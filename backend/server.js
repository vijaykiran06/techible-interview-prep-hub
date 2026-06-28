<<<<<<< HEAD
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
=======
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const companyRoutes = require('./routes/companyRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server running',
  });
});

// Routes
app.use('/api/companies', companyRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');

    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server running on port ${
          process.env.PORT || 3000
        }`
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
>>>>>>> 2fc883e04fed6d0f431bc0aa49715f5e149938c0
