import React, { useState } from "react";
import { generateQuiz } from "../services/aiChatService";

export default function AiQuizWidget({ topicTitle, tier }) {
  const [quiz, setQuiz]       = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [score, setScore]     = useState(null);

  const loadQuiz = async () => {
    setLoading(true);
    setScore(null);
    setAnswers({});
    try {
      const q = await generateQuiz(topicTitle, tier);
      setQuiz(q);
    } catch {
      alert("Could not generate quiz. Check your Groq API key.");
    } finally {
      setLoading(false);
    }
  };

  const submit = () => {
    const correct = quiz.filter((q, i) => answers[i] === q.answer).length;
    setScore(correct);
  };

  return (
    <div className="quiz">
      <div className="quiz__header">
        <h3 className="quiz__title"> Practice Quiz</h3>
        <button onClick={loadQuiz} disabled={loading} className="quiz__generate-btn">
          {loading ? "Generating..." : quiz.length ? "Regenerate" : "Generate Quiz"}
        </button>
      </div>

      {quiz.map((q, i) => (
        <div key={i} className="quiz__question">
          <p className="quiz__question-text">{i + 1}. {q.question}</p>
          <div className="quiz__options">
            {q.options.map((opt, j) => {
              const letter   = opt[0];
              const selected = answers[i] === letter;
              const correct  = score !== null && letter === q.answer;
              const wrong    = score !== null && selected && letter !== q.answer;

              return (
                <button
                  key={j}
                  onClick={() => score === null && setAnswers(a => ({ ...a, [i]: letter }))}
                  className={`quiz__option
                    ${correct  ? "quiz__option--correct"  : ""}
                    ${wrong    ? "quiz__option--wrong"    : ""}
                    ${selected && !correct && !wrong ? "quiz__option--selected" : ""}`}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {quiz.length > 0 && score === null && (
        <button onClick={submit} className="quiz__submit-btn">
          Submit
        </button>
      )}

      {score !== null && (
        <p className="quiz__score">
          You scored {score}/{quiz.length} 🎉
        </p>
      )}
    </div>
  );
}