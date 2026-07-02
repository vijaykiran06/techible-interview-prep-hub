import axiosConfig from "./axiosConfig";

export const askAiTutor = (topicTitle, question, tier) =>
  axiosConfig.post("/api/ai-chat/ask", { topicTitle, question, tier })
    .then(r => r.data.answer);

export const generateQuiz = (topicTitle, tier) =>
  axiosConfig.post("/api/ai-chat/quiz", { topicTitle, tier })
    .then(r => r.data.quiz);