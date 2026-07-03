import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChallengeDomainDetails } from '../../services/challengesApi';
import { ArrowLeft, ChevronRight, Folder } from 'lucide-react';

const ChallengeDomainPage = () => {
  const { domain: domainSlug } = useParams(); // Captured from router match /learn/challenges/:domain
  const { data, isLoading, isError, error } = useChallengeDomainDetails(domainSlug);
  
  const domainData = data?.data || {};
  const categories = domainData.categories || [];

  if (isError) {
    return (
      <div className="min-h-screen bg-zinc-950 text-red-500 flex items-center justify-center font-medium">
        {error?.message || 'Failed to sync domain sub-structure mapping records.'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-12 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumbs & Dynamic Back Button Context */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 font-medium mb-4">
          <Link to="/learn/challenges" className="hover:text-blue-400 transition-colors">
            Challenges
          </Link>
          <ChevronRight className="w-4 h-4 text-zinc-700" />
          <span className="text-zinc-300 truncate">{domainData.name || 'Loading...'}</span>
        </div>

        <Link 
          to="/learn/challenges" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group mb-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Domains
        </Link>

        {/* Dynamic Structural Title Banner */}
        {isLoading ? (
          <div className="space-y-3 animate-pulse max-w-xl">
            <div className="h-10 bg-zinc-900 rounded-xl w-3/4" />
            <div className="h-6 bg-zinc-900 rounded-xl w-1/2" />
          </div>
        ) : (
          <div className="space-y-3 max-w-4xl border-b border-zinc-800/80 pb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {domainData.name}
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              {domainData.description}
            </p>
          </div>
        )}

        {/* Categories Structural Data Render Layout */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-40 bg-zinc-900/40 border border-zinc-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16 text-zinc-500 bg-zinc-900/10 border border-zinc-800/60 rounded-2xl">
            No focus categories found tied inside this platform track mapping.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {categories.map((category) => (
              <div 
                key={category._id}
                className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center border border-zinc-700/40 text-blue-400">
                      <Folder className="w-5 h-5" />
                    </div>
                    {/* Denormalized Tracking Badge */}
                    <span className="text-xs font-semibold bg-zinc-800/60 text-zinc-300 px-2.5 py-1 rounded-full border border-zinc-700/30">
                      {category.challengeCount || 0} Challenges
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  <Link
                    to={`/learn/challenges/${domainSlug}/${category.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-sm text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all"
                  >
                    View challenges
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDomainPage;