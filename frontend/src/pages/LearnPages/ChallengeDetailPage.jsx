import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useChallengeDetail } from '../../services/challengesApi';
import { 
  ArrowLeft, 
  ChevronRight, 
  Clock, 
  HardDrive, 
  Lightbulb, 
  ExternalLink, 
  Building2, 
  CheckCircle2, 
  Code 
} from 'lucide-react';

const DIFFICULTY_CONFIG = {
  Easy: { className: 'bg-green-500/10 text-green-400 border-green-500/20', label: 'Easy' },
  Medium: { className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', label: 'Medium' },
  Hard: { className: 'bg-red-500/10 text-red-400 border-red-500/20', label: 'Hard' }
};

const ChallengeDetailPage = () => {
  const { domain: domainSlug, category: categorySlug, slug: challengeSlug } = useParams();
  const { data, isLoading, isError, error } = useChallengeDetail(domainSlug, categorySlug, challengeSlug);
  
  const challenge = data?.data || {};
  const badge = DIFFICULTY_CONFIG[challenge.difficulty] || DIFFICULTY_CONFIG.Medium;

  // Self-contained dynamic tab active state configuration
  const [activeTabValue, setActiveTabValue] = useState('tab-0');

  if (isError) {
    return (
      <div className="min-h-screen bg-zinc-950 text-red-500 flex items-center justify-center font-medium">
        {error?.message || 'Failed to sync detailed challenge workspace profile.'}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-12 animate-pulse space-y-8">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="h-6 bg-zinc-900 rounded w-1/4" />
          <div className="h-12 bg-zinc-900 rounded w-1/2" />
          <div className="h-64 bg-zinc-900 rounded-2xl w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-12 selection:bg-blue-500/30 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb Context Mapping */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500 font-medium">
          <Link to="/learn/challenges" className="hover:text-blue-400 transition-colors">Challenges</Link>
          <ChevronRight className="w-4 h-4 text-zinc-800" />
          <Link to={`/learn/challenges/${domainSlug}`} className="hover:text-blue-400 transition-colors capitalize">
            {domainSlug?.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-4 h-4 text-zinc-800" />
          <Link to={`/learn/challenges/${domainSlug}/${categorySlug}`} className="hover:text-blue-400 transition-colors capitalize">
            {categorySlug?.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-4 h-4 text-zinc-800" />
          <span className="text-zinc-300 truncate">{challenge.title}</span>
        </div>

        <Link 
          to={`/learn/challenges/${domainSlug}/${categorySlug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to List
        </Link>

        {/* Challenge Header Workspace Area */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${badge.className}`}>
              {badge.label}
            </span>
            <span className="text-xs font-semibold bg-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-md border border-zinc-700/30 uppercase tracking-wide">
              {domainSlug?.replace('-', ' ')}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {challenge.title}
          </h1>
          <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap border-t border-zinc-800/60 pt-4">
            {challenge.description}
          </p>
        </div>

        {/* Layout Grid: Left Panel (Walkthroughs) | Right Panel (Reference answers / metadata) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Context Left Panel Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Scenarios / Examples Sections */}
            {challenge.examples && challenge.examples.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  Scenarios & Examples
                </h3>
                <div className="space-y-4">
                  {challenge.examples.map((ex, index) => (
                    <div key={index} className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-5 space-y-3 shadow-md">
                      {ex.label && <span className="text-xs font-bold text-zinc-400 block">{ex.label}</span>}
                      {ex.input && (
                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/40 font-mono text-xs text-zinc-300">
                          <span className="text-blue-400 font-semibold">Input:</span> {ex.input}
                        </div>
                      )}
                      {ex.output && (
                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/40 font-mono text-xs text-zinc-300">
                          <span className="text-green-400 font-semibold">Output:</span> {ex.output}
                        </div>
                      )}
                      {ex.explanation && (
                        <p className="text-zinc-400 text-xs leading-relaxed pt-1">
                          <span className="text-zinc-300 font-medium">Explanation:</span> {ex.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Conceptual Approach / Thinking Framework */}
            {challenge.approach && (
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 space-y-6 shadow-md">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Code className="w-5 h-5 text-blue-400" />
                  Thinking Framework & Core Approach
                </h3>
                {challenge.approach.overview && (
                  <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {challenge.approach.overview}
                  </p>
                )}

                {/* Granular Architectural Step Breakdown Process */}
                {challenge.approach.steps && challenge.approach.steps.length > 0 && (
                  <div className="space-y-6 pt-2">
                    {challenge.approach.steps.map((step, idx) => (
                      <div key={idx} className="relative pl-6 border-l-2 border-zinc-800 space-y-2">
                        <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-4 border-zinc-950" />
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">
                          Step {idx + 1}: {step.title}
                        </h4>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          {step.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Side Context Right Panel Column */}
          <div className="space-y-6">
            
            {/* Complexity Tracking / Architecture Trade-offs Card */}
            {challenge.tradeoffs && (challenge.tradeoffs.timeComplexity || challenge.tradeoffs.designTradeoffs?.length > 0) && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <h4 className="text-sm font-bold text-white tracking-wide uppercase border-b border-zinc-800 pb-2">
                  Complexity & Trade-offs
                </h4>
                
                {/* Time Metrics Blocks */}
                {challenge.tradeoffs.timeComplexity && (
                  <div className="flex items-start gap-3 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/40">
                    <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-zinc-200">Time: {challenge.tradeoffs.timeComplexity}</div>
                      <p className="text-[11px] text-zinc-400 leading-normal">{challenge.tradeoffs.timeExplanation}</p>
                    </div>
                  </div>
                )}

                {/* Space Metrics Blocks */}
                {challenge.tradeoffs.spaceComplexity && (
                  <div className="flex items-start gap-3 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/40">
                    <HardDrive className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-zinc-200">Space: {challenge.tradeoffs.spaceComplexity}</div>
                      <p className="text-[11px] text-zinc-400 leading-normal">{challenge.tradeoffs.spaceExplanation}</p>
                    </div>
                  </div>
                )}

                {/* System Architecture Design Bullet Points */}
                {challenge.tradeoffs.designTradeoffs && challenge.tradeoffs.designTradeoffs.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {challenge.tradeoffs.designTradeoffs.map((bullet, index) => (
                      <p key={index} className="text-xs text-zinc-400 leading-relaxed pl-3 relative">
                        <span className="absolute left-0 top-2 w-1 h-1 bg-zinc-600 rounded-full" />
                        {bullet}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Core Summary Key Takeaway Insights Panel */}
            {challenge.keyInsights && challenge.keyInsights.length > 0 && (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 space-y-3 shadow-md">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider text-xs border-b border-zinc-800 pb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  Key Insights
                </h4>
                <ul className="space-y-2">
                  {challenge.keyInsights.map((insight, index) => (
                    <li key={index} className="text-xs text-zinc-400 leading-relaxed list-disc list-inside">
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Target Target Interview Companies Tags mapping */}
            {challenge.relatedCompanies && challenge.relatedCompanies.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                  Targeted At
                </h4>
                <div className="flex flex-wrap gap-2">
                  {challenge.relatedCompanies.map((comp) => (
                    <div key={comp._id} className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-xl text-xs font-medium">
                      <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                      {comp.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reference Answers Tabbed Render Panels Container */}
            {challenge.referenceAnswer && challenge.referenceAnswer.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <h4 className="text-sm font-bold text-white tracking-wide uppercase border-b border-zinc-800 pb-2">
                  Reference Solution
                </h4>
                
                {/* Custom, dependency-free premium tab buttons row wrapper */}
                <div className="w-full">
                  <div className="bg-zinc-950 border border-zinc-800 p-1 rounded-xl w-full flex overflow-x-auto gap-1">
                    {challenge.referenceAnswer.map((ans, i) => {
                      const tabId = `tab-${i}`;
                      const isActive = activeTabValue === tabId;
                      return (
                        <button 
                          key={i} 
                          type="button"
                          onClick={() => setActiveTabValue(tabId)}
                          className={`text-xs font-semibold rounded-lg px-3 py-1.5 transition-all flex-1 text-center truncate ${
                            isActive 
                              ? 'bg-blue-600 text-white shadow-md' 
                              : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                          }`}
                        >
                          {ans.tabLabel || ans.language}
                        </button>
                      );
                    })}
                  </div>

                  {/* Tab Contents Stream renderer via matching index triggers */}
                  <div className="mt-4 focus:outline-none">
                    {challenge.referenceAnswer.map((ans, i) => {
                      if (activeTabValue !== `tab-${i}`) return null;
                      return (
                        <div key={i}>
                          {ans.language === 'text' ? (
                            <p className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap bg-zinc-950 p-4 rounded-xl border border-zinc-800/60 max-h-96 overflow-y-auto">
                              {ans.content}
                            </p>
                          ) : (
                            <pre className="bg-zinc-950 border border-zinc-800/60 p-4 rounded-xl font-mono text-xs text-blue-300 overflow-x-auto max-h-96 overflow-y-auto whitespace-pre">
                              <code>{ans.content}</code>
                            </pre>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* External Links / References */}
            {challenge.externalResources && challenge.externalResources.length > 0 && (
              <div className="space-y-2">
                {challenge.externalResources.map((res, index) => (
                  <a 
                    key={index}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-zinc-900/40 border border-zinc-800/80 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-xl text-xs font-semibold transition-all group"
                  >
                    <span className="truncate">{res.label || `Practice on ${res.platform}`}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400 transition-colors shrink-0 ml-2" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailPage;