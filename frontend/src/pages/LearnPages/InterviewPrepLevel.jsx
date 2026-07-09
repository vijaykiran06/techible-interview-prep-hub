import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useInterviewTopics } from '../../services/interviewPrepApi';
import { ChevronRight, ArrowLeft, BookOpen } from 'lucide-react';

// Modern monochromatic text tokens combined with subtle matching glass borders
const CATEGORY_BADGES = {
  DSA: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'System Design': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Behavioral: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  HR: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Domain-Specific': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const InterviewPrepLevel = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const displayLevel = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();

  const { data, isLoading, isError, error } = useInterviewTopics(level);
  const coreTopics = data?.data || [];

  if (isError) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center max-w-7xl mx-auto px-4 text-red-400 bg-zinc-950">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-md">
          {error?.message || 'Failed to read domain module tracks.'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        
        {/* Navigation Breadcrumb Layout Mapping */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <Link to="/learn/interview-prep" className="hover:text-blue-400 transition-colors">Interview Prep</Link>
          <ChevronRight className="w-3 h-3 text-zinc-800" />
          <span className="text-zinc-300">{displayLevel} Modules</span>
        </div>

        {/* Back Navigation Trigger */}
        <button 
          onClick={() => navigate('/learn/interview-prep')}
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-all bg-zinc-900/60 hover:bg-zinc-900 p-2.5 px-4 rounded-xl border border-zinc-800/80 font-bold shadow-md group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
          Back to Level Selection
        </button>

        {/* Header Summary Section */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {displayLevel} Interview Frameworks
          </h1>
          <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
            Select a targeted technical competency domain mapped to {displayLevel} engineering standards.
          </p>
        </div>

        {/* Loading / Empty Content Dynamic Switcher */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((loader) => (
              <div key={loader} className="h-40 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : coreTopics.length === 0 ? (
          <div className="text-center py-16 bg-zinc-900/30 border border-zinc-800/60 rounded-2xl text-zinc-500 text-sm backdrop-blur-md shadow-inner">
            No preparatory categories are currently seeded inside this level track.
          </div>
        ) : (
          /* Main Track Grid Display */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTopics.map((topic) => (
              <div 
                key={topic._id} 
                className="bg-zinc-900/50 backdrop-blur-md p-6 rounded-2xl border border-zinc-800/80 shadow-xl flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-500/50 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-2.5 py-0.5 inline-block text-[10px] font-black uppercase tracking-wider rounded-md border ${CATEGORY_BADGES[topic.categoryType] || 'bg-zinc-800 text-zinc-400 border-zinc-700/40'}`}>
                      {topic.categoryType}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium flex items-center gap-1 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800/40">
                      <BookOpen className="w-3.5 h-3.5 text-zinc-500" /> {topic.questionCount} Patterns
                    </span>
                  </div>
                  
                  <h3 className="text-base font-bold text-white tracking-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {topic.title}
                  </h3>
                </div>

                {/* Sub-Action Navigation Bar with Smooth Indicator Slide */}
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-bold text-blue-400 w-full">
                  <button
                    onClick={() => navigate(`/learn/interview-prep/${level}/${topic.slug}`)}
                    className="w-full text-left flex items-center justify-between focus:outline-none"
                  >
                    <span className="group-hover:text-blue-300 transition-colors">Explore Problems</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 text-blue-500 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrepLevel;