import mongoose from 'mongoose';

const interviewProcessSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      unique: true, // One interview process per company
    },

    overview: {
      type: String,
      trim: true,
    },

    phases: [
      {
        order: {
          type: Number,
          required: true,
        },

        name: {
          type: String,
          required: true,
          trim: true,
        },

        duration: {
          type: String,
          trim: true,
        },

        format: {
          type: String,
          enum: ['Online', 'In-Person', 'Video Call', 'Phone'],
          default: 'Online',
        },

        whatItTests: {
          type: String,
          trim: true,
        },

        whatToExpect: [
          {
            type: String,
            trim: true,
          },
        ],

        platforms: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],

    generalTips: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);



export default mongoose.model(
  'InterviewProcess',
  interviewProcessSchema
);