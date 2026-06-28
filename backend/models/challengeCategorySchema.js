const mongoose = require('mongoose');

const challengeCategorySchema = new mongoose.Schema({
  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChallengeDomain',
    required: true
  },
  name: { type: String, required: true, trim: true },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: { type: String, trim: true },
  order: { type: Number, default: 0 },
  challengeCount: { type: Number, default: 0 }, // Denormalized count updated when challenges change
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Optimized index for sorting categories inside domains
challengeCategorySchema.index({ domain: 1, order: 1 });

module.exports = mongoose.model('ChallengeCategory', challengeCategorySchema);