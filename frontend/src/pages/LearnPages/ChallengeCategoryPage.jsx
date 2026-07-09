import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCategoryChallenges } from '../../services/challengesApi';
import { 
  setFilter, 
  setPage, 
  selectChallengeQueryParams 
} from '../../store/slices/challengeFilterSlice';
import { ArrowLeft, ChevronRight, Eye, Layers } from 'lucide-react';

// Unified difficulty color configurations matching design tokens
const DIFFICULTY_CONFIG = {
  Easy: { className: 'bg-green-500/10 text-green-400 border-green-500/20', label: 'Easy' },
  Medium: { className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', label: 'Medium' },
  Hard: { className: 'bg-red-500/10 text-red-400 border-red-500/20', label: 'Hard' }
};

const ChallengeCategoryPage = () => {
  const { domain: domainSlug, category: categorySlug } = useParams();
  const dispatch = useDispatch();
  
  // Connect cleanly to Redux filter slices mapping
  const queryParams = useSelector(selectChallengeQueryParams);
  const activeDifficulty = useSelector((state) => state.challengeFilters.filters.difficulty);
  const currentPage = useSelector((state) => state.challengeFilters.pagination.currentPage);

  // Stream parameters dynamically directly into React Query layer
  const { data, isLoading, isError, error } = useCategoryChallenges(domainSlug, categorySlug, queryParams);

  const categoryData = data?.data?.category || {};
  const challenges = data?.data?.challenges || [];
  const pagination = data?.pagination || {};

  if (isError) {
    return (
      <div className="min-h-screen bg-zinc-950 text-red-500 flex items-center justify-center font-medium">
        {error?.message || 'Failed to sync category problems registry.'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-12 selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb System */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 font-medium mb-2">
          <Link to="/learn/challenges" className="hover:text-blue-400 transition-colors">Challenges</Link>
          <ChevronRight className="w-4 h-4 text-zinc-800" />
          <Link to={`/learn/challenges/${domainSlug}`} className="hover:text-blue-400 transition-colors capitalize">
            {domainSlug?.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-4 h-4 text-zinc-800" />
          <span className="text-zinc-300 truncate">{categoryData.name || 'Loading...'}</span>
        </div>

        <Link 
          to={`/learn/challenges/${domainSlug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </Link>

        {/* Dynamic Category Text Banner */}
        <div className="border-b border-zinc-800/80 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {isLoading ? 'Loading Focus Space...' : categoryData.name}
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {categoryData.description || 'Filter through specific challenges below to test your practical software implementation limits.'}
            </p>
          </div>

          {/* Premium UI Filter Chips Area */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => dispatch(setFilter({ key: 'difficulty', value: diff }))}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  activeDifficulty === diff
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white border-transparent shadow-md'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Challenge Cards Stream Layout */}
        {isLoading ? (
          <div className="space-y-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-28 bg-zinc-900/60 border border-zinc-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : challenges.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 bg-zinc-900/10 border border-zinc-800/60 rounded-2xl">
            No matching challenges found under this query criteria.
          </div>
        ) : (
          <div className="space-y-3">
            {challenges.map((challenge) => {
              const badge = DIFFICULTY_CONFIG[challenge.difficulty] || DIFFICULTY_CONFIG.Medium;
              return (
                <div 
                  key={challenge._id}
                  className="group bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all duration-300 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2.5 max-w-3xl">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${badge.className}`}>
                        {badge.label}
                      </span>
                      <h4 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors">
                        {challenge.title}
                      </h4>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-1">
                      {challenge.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0 border-t border-zinc-800/50 sm:border-0 pt-3 sm:pt-0">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{challenge.views || 0} views</span>
                    </div>
                    
                    <Link
                      to={`/learn/challenges/${domainSlug}/${categorySlug}/${challenge.slug}`}
                      className="px-4 py-2 bg-zinc-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 text-zinc-200 hover:text-white text-xs font-bold rounded-xl border border-zinc-700/80 hover:border-transparent transition-all duration-300"
                    >
                      Solve Challenge
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic Pagination Footer */}
        {!isLoading && pagination.totalPages > 1 && (
          <div className="pt-6 flex justify-center items-center gap-2 border-t border-zinc-900">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => dispatch(setPage(page))}
                className={`w-9 h-9 rounded-xl font-bold text-xs transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCategoryPage;