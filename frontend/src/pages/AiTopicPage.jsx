import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAiTopicBySlug } from "../services/aiTopicService";
import AiTutorChat from "../components/AiTutorChat";
import AiQuizWidget from "../components/AiQuizWidget";

export default function AiTopicPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: topic, isLoading, isError } = useQuery({
    queryKey: ["ai-topic", slug],
    queryFn: () => fetchAiTopicBySlug(slug),
  });

  if (isLoading) return <p className="status-msg">Loading...</p>;
  if (isError || !topic) return <p className="status-msg status-msg--error">Topic not found.</p>;

  return (
    <div className="topic-page">
      <button onClick={() => navigate("/learn/ai")} className="topic-page__back">
        ← Back to Hub
      </button>

      <span className={`topic-page__tier tier--${topic.tier}`}>
        Tier {topic.tier}
      </span>
      <h1 className="topic-page__title">{topic.title}</h1>
      <p className="topic-page__desc">{topic.description}</p>

      <div className="topic-page__content">
        {topic.content}
      </div>

      <AiTutorChat topicTitle={topic.title} tier={topic.tier} />
      <AiQuizWidget topicTitle={topic.title} tier={topic.tier} />
    </div>
  );
}