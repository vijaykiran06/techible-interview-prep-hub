import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useInterviewQuestions } from '../../services/interviewPrepApi';
import InterviewPrepQuestionCard from './InterviewPrepQuestionCard';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const InterviewPrepTopic = () => {
  const { level, topic } = useParams();
  const navigate = useNavigate();
  const displayLevel = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();

  const { data, isLoading, isError, error } = useInterviewQuestions(level, topic);
  const fullTopicMetadata = data?.data || {};
  const questionSet = fullTopicMetadata.questions || [];

  if (isError) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center max-w-7xl mx-auto px-4 text-red-400 bg-zinc-950">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-md">
          {error?.message || 'Failed to verify explicit category questions.'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        
        {/* Navigation Breadcrumb Layout Mapping */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <Link to="/learn/interview-prep" className="hover:text-blue-400 transition-colors">Interview Prep</Link>
          <ChevronRight className="w-3 h-3 text-zinc-800" />
          <Link to={`/learn/interview-prep/${level}`} className="hover:text-blue-400 transition-colors">{displayLevel}</Link>
          <ChevronRight className="w-3 h-3 text-zinc-800" />
          <span className="text-zinc-300 truncate">{fullTopicMetadata.title || 'Topic Loading'}</span>
        </div>

        {/* Back Navigation Trigger */}
        <button 
          onClick={() => navigate(`/learn/interview-prep/${level}`)}
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-all bg-zinc-900/60 hover:bg-zinc-900 p-2.5 px-4 rounded-xl border border-zinc-800/80 font-bold shadow-md group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
          Back to Topics
        </button>

        {/* Header Summary Section */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {fullTopicMetadata.title ? `${fullTopicMetadata.title} Matrix` : 'Framework Matrix'}
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Review common patterns for engineering interviews at {displayLevel} tiers. Each problem includes a structural blueprint framework.
          </p>
        </div>

        {/* Dynamic Skeleton Content State Routing */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((skeletonIndex) => (
              <div key={skeletonIndex} className="h-16 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : questionSet.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800/60 rounded-2xl text-zinc-500 text-sm backdrop-blur-md shadow-inner">
            No problem-sets match this track criteria yet.
          </div>
        ) : (
          /* Render Active Refactored Accordion Set */
          <div className="w-full space-y-4">
            {questionSet.map((q, idx) => (
              <InterviewPrepQuestionCard key={idx} questionItem={q} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrepTopic;