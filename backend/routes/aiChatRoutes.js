import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const tierContext = {
  1: "The student is a beginner. Use simple language, avoid jargon, give basic examples.",
  2: "The student is intermediate. Use technical terms, go deeper into concepts.",
  3: "The student is advanced. Assume strong CS fundamentals, discuss edge cases and internals.",
};

// POST /api/ai-chat/ask
router.post("/ask", async (req, res) => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { topicTitle, question, tier } = req.body;

    console.log("ASK REQUEST:", { topicTitle, question, tier });
    console.log("API KEY EXISTS:", !!process.env.GROQ_API_KEY);

    const prompt = `You are a CS interview coach helping a student understand "${topicTitle}".
${tierContext[tier] || tierContext[1]}
Student question: "${question}"
Give a clear, helpful answer in 3-5 sentences. Stay focused on the topic.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    });

    res.json({ success: true, answer: response.choices[0].message.content });
  } catch (err) {
    console.error("GROQ ASK ERROR:", err.message, err.status, err.error);
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/ai-chat/quiz
router.post("/quiz", async (req, res) => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { topicTitle, tier } = req.body;

    console.log("QUIZ REQUEST:", { topicTitle, tier });
    console.log("API KEY EXISTS:", !!process.env.GROQ_API_KEY);

    const prompt = `Generate 3 multiple choice questions about "${topicTitle}" for a ${tier === 1 ? "beginner" : tier === 2 ? "intermediate" : "advanced"} CS student.
Return ONLY a valid JSON array, no extra text, no markdown:
[
  {
    "question": "...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": "A"
  }
]`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
    });

    const raw = response.choices[0].message.content.trim();
    console.log("QUIZ RAW RESPONSE:", raw);
    const quiz = JSON.parse(raw);
    res.json({ success: true, quiz });
  } catch (err) {
    console.error("GROQ QUIZ ERROR:", err.message, err.status, err.error);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;