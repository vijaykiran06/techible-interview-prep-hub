import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import AiTopicCard from "../components/AiTopicCard";
import { fetchAiTopicsGrouped } from "../services/aiTopicService";

const TIERS = {
  1: { label: "Tier 1 — Fundamentals", free: true },
  2: { label: "Tier 2 — Intermediate", free: false },
  3: { label: "Tier 3 — Advanced",     free: false },
};

const isLoggedIn = false;

export default function AiLearningHub() {
  const [search, setSearch] = useState("");

  const { data: grouped, isLoading, isError } = useQuery({
    queryKey: ["ai-topics"],
    queryFn: fetchAiTopicsGrouped,
  });

  if (isLoading) return <p className="status-msg">Loading topics...</p>;
  if (isError)   return <p className="status-msg status-msg--error">Failed to load. Is the server running?</p>;

  return (
    <div className="hub-container">
      <h1 className="hub-title">CS Interview Prep Hub</h1>
      <p className="hub-subtitle">Master CS fundamentals — from arrays to system design.</p>

      <input
        type="text"
        placeholder="Search topics..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="hub-search"
      />

      {[1, 2, 3].map(tier => {
        const { label, free } = TIERS[tier];
        const locked = !free && !isLoggedIn;
        const filtered = (grouped[tier] || []).filter(t =>
          t.title.toLowerCase().includes(search.toLowerCase())
        );

        return (
          <div key={tier} className="tier-section">
            <div className="tier-section__header">
              <h2 className="tier-section__title">{label}</h2>
              {!free && (
                <span className="tier-section__badge">
                  <Lock size={10} /> Premium
                </span>
              )}
            </div>

            {locked && (
              <div className="tier-section__alert">
                🔒 This tier is premium. Subscribe to unlock all {filtered.length} topics.
              </div>
            )}

            <div className="topic-grid">
              {filtered.map(topic => (
                <AiTopicCard key={topic._id} topic={topic} locked={locked} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}