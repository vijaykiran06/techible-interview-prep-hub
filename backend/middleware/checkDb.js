import mongoose from "mongoose";

const checkDb = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "Database unavailable",
      error: "DATABASE_UNAVAILABLE",
      statusCode: 503,
    });
  }
  next();
};

export default checkDb;