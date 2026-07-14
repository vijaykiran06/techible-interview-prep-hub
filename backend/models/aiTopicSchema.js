import mongoose from "mongoose";

const aiTopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tier: { type: Number, required: true },
  description: { type: String },
  content: { type: String },
  resources: [{ label: String, url: String }],
  
  // Navigation Links
  prevTopic: { 
    title: { type: String },
    slug: { type: String }
  },
  nextTopic: { 
    title: { type: String },
    slug: { type: String }
  },

  // Deep Dive Additions
  interviewQuestions: [{
    question: { type: String },
    answer: { type: String }
  }],
  codingProblems: [{
    title: { type: String },
    problemStatement: { type: String },
    explanation: { type: String },
    codeSolution: { type: String }
  }]
}, { timestamps: true });

export default mongoose.models.AiTopic || mongoose.model("AiTopic", aiTopicSchema);