const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    logo: {
      url: {
        type: String,
        trim: true,
      },
      filename: {
        type: String,
        trim: true,
      },
    },

    description: {
      type: String,
      trim: true,
    },

    industry: {
      type: String,
      enum: [
        'Tech',
        'Finance',
        'Consulting',
        'E-Commerce',
        'Healthcare',
        'EdTech',
        'Other',
      ],
      default: 'Tech',
    },

    headquarters: {
      type: String,
      trim: true,
    },

    founded: {
      type: Number,
    },

    website: {
      type: String,
      trim: true,
    },

    glassdoorUrl: {
      type: String,
      trim: true,
    },

    linkedinUrl: {
      type: String,
      trim: true,
    },

    interviewDifficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },

    featured: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    approved: {
      type: Boolean,
      default: false,
    },

    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster filtering/search

companySchema.index({ industry: 1 });
companySchema.index({ interviewDifficulty: 1 });
companySchema.index({ featured: 1 });
companySchema.index({ views: -1 });

module.exports = mongoose.model('Company', companySchema);