import mongoose from 'mongoose';

const compensationSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: [
        'Fresher',
        'Junior',
        'Mid-Level',
        'Senior',
        'Staff',
        'Principal',
      ],
      default: 'Fresher',
    },

    minSalary: {
      type: Number,
      required: true,
    },

    maxSalary: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: 'INR',
    },

    location: {
      type: String,
      trim: true,
    },

    source: {
      type: String,
      trim: true,
    },

    yearReported: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

compensationSchema.index({ company: 1 });
compensationSchema.index({ level: 1 });

export default mongoose.model(
  'Compensation',
  compensationSchema
);