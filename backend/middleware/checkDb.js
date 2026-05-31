import mongoose from "mongoose";

const checkDb = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ success: false, message: "Database not connected" });
  }
  next();
};

export { checkDb };