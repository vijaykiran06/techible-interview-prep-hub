import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default React.memo(function AiTopicCard({ topic, locked }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => !locked && navigate(`/learn/ai/${topic.slug}`)}
      className={locked ? "topic-card topic-card--locked" : "topic-card"}
    >
      {locked && <Lock size={14} className="topic-card__lock" />}
      <span className={`topic-card__tier tier--${topic.tier}`}>
        Tier {topic.tier}
      </span>
      <h3 className="topic-card__title">{topic.title}</h3>
      <p className="topic-card__desc">{topic.description}</p>
    </div>
  );
});