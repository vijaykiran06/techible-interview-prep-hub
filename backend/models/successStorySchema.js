import mongoose from 'mongoose';
const successStorySchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },

    authorName: {
      type: String,
      trim: true,
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    package: {
      min: {
        type: Number,
      },

      max: {
        type: Number,
      },

      currency: {
        type: String,
        default: 'INR',
      },
    },

    yearOfJoining: {
      type: Number,
    },

    story: {
      type: String,
      required: true,
      trim: true,
    },

    preparationApproach: {
      type: String,
      trim: true,
    },

    keyAdvice: {
      type: String,
      trim: true,
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

successStorySchema.index({ company: 1 });
successStorySchema.index({ yearOfJoining: -1 });

export default mongoose.model(
  'SuccessStory',
  successStorySchema
);