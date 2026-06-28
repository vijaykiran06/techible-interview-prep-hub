const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "DSA",
        "System Design",
        "Behavioral",
        "AI Learning",
        "External Resource",
      ],
      default: "DSA",
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

resourceSchema.index({ company: 1 });

module.exports = mongoose.model(
  "Resource",
  resourceSchema
);