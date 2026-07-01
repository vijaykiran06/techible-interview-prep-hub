import mongoose from 'mongoose';
const interviewQuestionSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        'DSA',
        'System Design',
        'Behavioral',
        'HR',
        'Domain-Specific',
        'LLD',
        'HLD',
      ],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },

    round: {
      type: String,
      trim: true,
    },

    pattern: {
      type: String,
      trim: true,
    },

    thingsToKeepInMind: [
      {
        type: String,
        trim: true,
      },
    ],

    isRecent: {
      type: Boolean,
      default: false,
    },

    dateAsked: {
      type: Date,
    },

    upvotes: {
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

// Performance indexes
interviewQuestionSchema.index({
  company: 1,
  category: 1,
  difficulty: 1,
});

interviewQuestionSchema.index({
  company: 1,
  dateAsked: -1,
});

export default mongoose.model(
  'InterviewQuestion',
  interviewQuestionSchema
);