const mongoose = require('mongoose');

const interviewPrepTopicSchema = new mongoose.Schema({
level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
},
category: {
    type: String,
    enum: ['DSA', 'System Design', 'Behavioral', 'HR', 'Domain-Specific'],
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
order: { type: Number, default: 0 },
questions: [{
    question: { type: String, required: true, trim: true },
    pattern: { type: String, trim: true },
    approach: { type: String, trim: true },
    thingsToKeepInMind: [{ type: String, trim: true }],
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Medium'
    }
}],
approved: { type: Boolean, default: true },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now }
});


interviewPrepTopicSchema.index({ level: 1, order: 1 });

module.exports = mongoose.model('InterviewPrepTopic', interviewPrepTopicSchema);