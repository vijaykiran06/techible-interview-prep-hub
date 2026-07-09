import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterviewLevels } from '../../services/interviewPrepApi';
import { Layers, Briefcase, Award, ArrowRight } from 'lucide-react';

// Modern monochromatic icon mapping with crisp tech accents matching the design tokens
const ICON_MAP = {
  Easy: <Layers className="w-6 h-6 text-emerald-400" />,
  Medium: <Briefcase className="w-6 h-6 text-amber-400" />,
  Hard: <Award className="w-6 h-6 text-rose-400" />,
};

const InterviewPrepHub = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useInterviewLevels();

  if (isError) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center max-w-7xl mx-auto px-4 text-red-400 font-medium bg-zinc-950">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-md">
          {error?.message || 'Failed to initialize system experience tracks.'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        
        {/* Module Header Segment */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Leveled Interview Prep
          </h1>
          <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
            Choose an interview difficulty tailored to your targeted career scope. Master specialized challenges optimized per technical tier.
          </p>
        </div>

        {/* Loading State Skeleton Tracks */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((placeholder) => (
              <div 
                key={placeholder} 
                className="h-72 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl animate-pulse" 
              />
            ))}
          </div>
        ) : (
          /* Main Track Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.data?.map((lvl) => (
              <div 
                key={lvl.level} 
                className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-6 border border-zinc-800/80 shadow-2xl flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-500/50 group"
              >
                <div>
                  {/* Icon Container with Modern subtle background accents */}
                  <div className="mb-5 p-3 bg-zinc-950 border border-zinc-800/60 inline-flex rounded-xl shadow-inner">
                    {ICON_MAP[lvl.level] || <Layers className="w-6 h-6 text-blue-400" />}
                  </div>

                  {/* Level Typography Meta */}
                  <h3 className="text-xl font-bold text-white mb-2 capitalize tracking-tight">
                    {lvl.level} Track
                  </h3>
                  <p className="text-xs text-zinc-400 mb-6 leading-relaxed min-h-[3rem]">
                    {lvl.description}
                  </p>
                  
                  {/* Metadata Specs Blocks */}
                  <div className="space-y-3 border-t border-zinc-800/60 pt-5 mb-6">
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-zinc-500">Categories Available:</span>
                      <span className="text-zinc-200 font-semibold bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800/40">
                        {lvl.topicCount} Subjects
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-medium">
                      <span className="text-zinc-500">Est. Practice Allocation:</span>
                      <span className="text-zinc-200 font-semibold bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800/40">
                        {lvl.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button with Premium Blue Gradient */}
                <button
                  onClick={() => navigate(`/learn/interview-prep/${lvl.level.toLowerCase()}`)}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-bold text-xs tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98]"
                >
                  Start Prep 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPrepHub;