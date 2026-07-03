const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChallengeDomain',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChallengeCategory',
    required: true
  },
  title: { type: String, required: true, trim: true },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  description: { type: String, required: true, trim: true },
  examples: [{
    label: { type: String, trim: true }, // e.g., "Example 1" or "Scenario Context"
    input: { type: String, trim: true },
    output: { type: String, trim: true },
    explanation: { type: String, trim: true }
  }],
  approach: {
    overview: { type: String, trim: true },
    steps: [{
      title: { type: String, trim: true },
      explanation: { type: String, trim: true },
      codeSnippets: [{
        language: {
          type: String,
          enum: ['javascript', 'python', 'java', 'cpp', 'sql', 'text'],
          default: 'javascript'
        },
        tabLabel: { type: String, trim: true }, // e.g., "Optimal Solution"
        code: { type: String }
      }]
    }]
  },
  tradeoffs: {
    timeComplexity: { type: String, trim: true },
    timeExplanation: { type: String, trim: true },
    spaceComplexity: { type: String, trim: true },
    spaceExplanation: { type: String, trim: true },
    designTradeoffs: [{ type: String, trim: true }]
  },
  keyInsights: [{ type: String, trim: true }],
  referenceAnswer: [{
    language: {
      type: String,
      enum: ['javascript', 'python', 'java', 'cpp', 'sql', 'text'],
      default: 'text'
    },
    tabLabel: { type: String, trim: true },
    content: { type: String }
  }],
  externalResources: [{
    platform: { type: String, trim: true },
    url: { type: String, trim: true },
    label: { type: String, trim: true }
  }],
  relatedCompanies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }],
  order: { type: Number, default: 0 },
  approved: { type: Boolean, default: true },
  views: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Performance optimization indices for frequent querying
challengeSchema.index({ domain: 1, category: 1, difficulty: 1 });
challengeSchema.index({ domain: 1, category: 1, order: 1 });

module.exports = mongoose.model('Challenge', challengeSchema);