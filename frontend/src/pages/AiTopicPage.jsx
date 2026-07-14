import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAiTopicBySlug } from "../services/aiTopicService";
import AiTutorChat from "../components/AiTutorChat";
import AiQuizWidget from "../components/AiQuizWidget";
import { ChevronLeft, ChevronRight, Code, HelpCircle } from "lucide-react"; // Assuming you use lucide-react

export default function AiTopicPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: topic, isLoading, isError } = useQuery({
    queryKey: ["ai-topic", slug],
    queryFn: () => fetchAiTopicBySlug(slug),
  });

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) return <p className="status-msg text-center mt-10">Loading...</p>;
  if (isError || !topic) return <p className="status-msg status-msg--error text-center mt-10 text-red-500">Topic not found.</p>;

  return (
    <div className="topic-page max-w-5xl mx-auto px-4 py-8">
      <button onClick={() => navigate("/learn/ai")} className="text-slate-400 hover:text-white mb-6 flex items-center gap-2">
        <ChevronLeft size={16} /> Back to Hub
      </button>

      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 tier--${topic.tier}`}>
        Tier {topic.tier}
      </span>
      <h1 className="text-4xl font-bold mb-4">{topic.title}</h1>
      <p className="text-lg text-slate-300 mb-8">{topic.description}</p>

      {/* Main Content */}
      <div className="prose prose-invert max-w-none mb-12 whitespace-pre-wrap">
        {topic.content}
      </div>

      {/* Interview Questions Section */}
      {topic.interviewQuestions?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-400">
            <HelpCircle /> Frequently Asked Interview Questions
          </h2>
          <div className="space-y-6">
            {topic.interviewQuestions.map((q, idx) => (
              <div key={idx} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-lg mb-2">Q: {q.question}</h4>
                <p className="text-slate-300 whitespace-pre-wrap">{q.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coding Problems Section */}
      {topic.codingProblems?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-400">
            <Code /> Top Coding Problems
          </h2>
          <div className="space-y-8">
            {topic.codingProblems.map((prob, idx) => (
              <div key={idx} className="bg-[#0f172a] p-6 rounded-lg border border-slate-700 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-3">{prob.title}</h3>
                <p className="text-slate-400 italic mb-4">{prob.problemStatement}</p>
                <div className="mb-4">
                  <strong className="text-slate-200">Approach & Explanation:</strong>
                  <p className="text-slate-300 mt-1">{prob.explanation}</p>
                </div>
                <div className="bg-black rounded p-4 overflow-x-auto">
                  <pre className="text-sm text-green-300 font-mono">
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
        <div className="mb-12 bg-slate-900 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">📚 Additional Resources</h3>
          <ul className="space-y-2">
            {topic.resources.map((r, i) => (
              <li key={i}>
                <a href={r.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                  {r.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Topic Navigation Footer */}
      <div className="flex justify-between items-center mt-16 pt-6 border-t border-slate-700">
        {topic.prevTopic ? (
          <button
            onClick={() => navigate(`/learn/ai/${topic.prevTopic.slug}`)}
            className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
          >
            <ChevronLeft size={18} />
            <div className="text-left">
              <span className="text-xs text-slate-400 block">Previous</span>
              <span className="font-semibold">{topic.prevTopic.title}</span>
            </div>
          </button>
        ) : (
          <div /> // Empty div to maintain flexbox spacing
        )}

        {topic.nextTopic ? (
          <button
            onClick={() => navigate(`/learn/ai/${topic.nextTopic.slug}`)}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
          >
            <div className="text-right">
              <span className="text-xs text-blue-200 block">Next Up</span>
              <span className="font-semibold">{topic.nextTopic.title}</span>
            </div>
            <ChevronRight size={18} />
          </button>
        ) : (
          <div />
        )}
      </div>

      <div className="mt-16">
        <AiTutorChat topicTitle={topic.title} tier={topic.tier} />
        <AiQuizWidget topicTitle={topic.title} tier={topic.tier} />
      </div>
    </div>
  );
}