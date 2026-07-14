import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAiTopicBySlug } from "../services/aiTopicService";
import AiTutorChat from "../components/AiTutorChat";
import AiQuizWidget from "../components/AiQuizWidget";
import { ChevronLeft, ChevronRight, Code, HelpCircle } from "lucide-react";

export default function AiTopicPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: topic, isLoading, isError } = useQuery({
    queryKey: ["ai-topic", slug],
    queryFn: () => fetchAiTopicBySlug(slug),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) return <p className="status-msg">Loading...</p>;
  if (isError || !topic) return <p className="status-msg status-msg--error">Topic not found.</p>;

  return (
    <div className="topic-page">
      <button onClick={() => navigate("/learn/ai")} className="topic-page__back">
        <ChevronLeft size={16} /> Back to Hub
      </button>

      <span className={`tier-badge tier--${topic.tier}`}>
        Tier {topic.tier}
      </span>
      
      <h1 className="topic-page__title">{topic.title}</h1>
      <p className="topic-page__desc">{topic.description}</p>

      <div className="topic-page__content prose prose-invert max-w-none">
        {topic.content}
      </div>

      {/* Interview Questions Section */}
      {topic.interviewQuestions?.length > 0 && (
        <div className="mt-12">
          <h2 className="section-title section-title--blue">
            <HelpCircle /> Frequently Asked Interview Questions
          </h2>
          <div>
            {topic.interviewQuestions.map((q, idx) => (
              <div key={idx} className="qa-box">
                <h4>Q: {q.question}</h4>
                <p>{q.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coding Problems Section */}
      {topic.codingProblems?.length > 0 && (
        <div className="mt-12">
          <h2 className="section-title section-title--green">
            <Code /> Top Coding Problems
          </h2>
          <div>
            {topic.codingProblems.map((prob, idx) => (
              <div key={idx} className="code-box">
                <h3 className="code-box__title">{prob.title}</h3>
                <p className="code-box__desc">{prob.problemStatement}</p>
                
                <div className="code-box__explanation">
                  <strong>Approach & Explanation:</strong>
                  <p>{prob.explanation}</p>
                </div>
                
                <div className="code-block-wrapper">
                  <pre>
                    <code>{prob.codeSolution}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources */}
      {topic.resources?.length > 0 && (
        <div className="resources-box mt-12">
          <h3>📚 Additional Resources</h3>
          <ul className="resources-list">
            {topic.resources.map((r, i) => (
              <li key={i}>
                <a href={r.url} target="_blank" rel="noreferrer" className="resources-link">
                  {r.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Topic Navigation Footer */}
      <div className="topic-nav">
        {topic.prevTopic ? (
          <button
            onClick={() => navigate(`/learn/ai/${topic.prevTopic.slug}`)}
            className="nav-btn nav-btn--prev"
          >
            <ChevronLeft size={18} />
            <div>
              <span className="nav-btn__label">Previous</span>
              <span className="nav-btn__title">{topic.prevTopic.title}</span>
            </div>
          </button>
        ) : (
          <div /> 
        )}

        {topic.nextTopic ? (
          <button
            onClick={() => navigate(`/learn/ai/${topic.nextTopic.slug}`)}
            className="nav-btn nav-btn--next"
          >
            <div>
              <span className="nav-btn__label">Next Up</span>
              <span className="nav-btn__title">{topic.nextTopic.title}</span>
            </div>
            <ChevronRight size={18} />
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Tutors and Quizzes */}
      <div style={{ marginTop: "4rem" }}>
        <AiTutorChat topicTitle={topic.title} tier={topic.tier} />
        <AiQuizWidget topicTitle={topic.title} tier={topic.tier} />
      </div>
    </div>
  );
}