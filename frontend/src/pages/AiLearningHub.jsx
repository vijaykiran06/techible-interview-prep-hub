import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import AiTopicCard from "../components/AiTopicCard";
import { fetchAiTopicsGrouped } from "../services/aiTopicService";

const TIERS = {
  1: { label: "Tier 1 — Fundamentals", free: true },
  2: { label: "Tier 2 — Intermediate", free: false },
  3: { label: "Tier 3 — Advanced",     free: false },
};

const isLoggedIn = false;
const completedTopics = []; // replace with real user data later

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

        // 0 for guests, real count for logged-in
        const completed = isLoggedIn
          ? completedTopics.filter(id => filtered.find(t => t._id === id)).length
          : 0;
        const progress = filtered.length
          ? Math.round((completed / filtered.length) * 100)
          : 0;

        return (
          <div key={tier} className="tier-section">
            {/* Header */}
            <div className="tier-section__header">
              <h2 className="tier-section__title">{label}</h2>
              {!free && (
                <span className="tier-section__badge">
                  <Lock size={10} /> Premium
                </span>
              )}
              <span className="tier-section__progress-text">
                {completed}/{filtered.length} completed
              </span>
            </div>

            {/* Shadcn Progress Bar */}
            <Progress value={progress} className="tier-progress" />

            {/* Shadcn Alert for locked tiers */}
            {locked && (
              <Alert className="tier-section__shadcn-alert">
                <Lock className="tier-alert__icon" />
                <AlertDescription className="tier-alert__desc">
                  This tier is premium.{" "}
                  <a href="/pricing" className="tier-alert__link">
                    Subscribe
                  </a>{" "}
                  to unlock all {filtered.length} topics.
                </AlertDescription>
              </Alert>
            )}

            {/* Cards with overlay if locked */}
            <div className="topic-grid-wrapper">
              <div className={locked ? "topic-grid topic-grid--locked" : "topic-grid"}>
                {filtered.map(topic => (
                  <AiTopicCard key={topic._id} topic={topic} locked={locked} />
                ))}
              </div>

              {/* Gate Overlay */}
              {locked && (
                <div className="tier-gate-overlay">
                  <Lock size={32} className="tier-gate-overlay__icon" />
                  <p className="tier-gate-overlay__text">Premium Content</p>
                  <a href="/pricing" className="tier-gate-overlay__btn">
                    Subscribe to Unlock
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}