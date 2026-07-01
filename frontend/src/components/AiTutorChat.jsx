import React, { useState } from "react";
import { askAiTutor } from "../services/aiChatService";

export default function AiTutorChat({ topicTitle, tier }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer]     = useState("");
  const [loading, setLoading]   = useState(false);

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await askAiTutor(topicTitle, question, tier);
      setAnswer(res);
    } catch {
      setAnswer("Could not reach AI. Check your Groq API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chat">
      <h3 className="ai-chat__title">
        🤖 AI Tutor
        <span className="ai-chat__badge">Tier {tier} Mode</span>
      </h3>

      <div className="ai-chat__input-row">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === "Enter" && ask()}
          placeholder={`Ask anything about "${topicTitle}"...`}
          className="ai-chat__input"
        />
        <button
          onClick={ask}
          disabled={loading}
          className="ai-chat__btn">
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>

      {answer && (
        <div className="ai-chat__answer">{answer}</div>
      )}
    </div>
  );
}