const mongoose = require('mongoose');

const challengeDomainSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // e.g., "DSA & Algorithms"
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true // e.g., "dsa"
  },
  description: { type: String, trim: true },
  icon: { type: String, trim: true }, // Stores Lucide icon name string
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChallengeDomain', challengeDomainSchema);