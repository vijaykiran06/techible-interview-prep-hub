const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const companyRoutes = require('./routes/companyRoutes');
const interviewPrepRoutes = require('./routes/interviewPrepRoutes');
// 1. IMPORT YOUR NEW CHALLENGE ROUTES
const challengeRoutes = require('./routes/challengeRoutes');

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
app.use('/api/interview-prep', interviewPrepRoutes);
// 2. MOUNT THE CHALLENGES ROUTE TO MATCH THE SRS SPECIFICATION Exactly
app.use('/api/challenges', challengeRoutes);

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