import { createRequire } from "module";
const require = createRequire(import.meta.url);
const logger = require("../utils/logger.js");

const handleError = (res, error, defaultMessage = "An error occurred") => {
  logger.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: error.message,
      statusCode: 400,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
      error: "INVALID_ID",
      statusCode: 400,
    });
  }

  return res.status(500).json({
    success: false,
    message: defaultMessage,
    error: process.env.NODE_ENV === "production" ? "INTERNAL_SERVER_ERROR" : error.message,
    statusCode: 500,
  });
};

export default handleError;