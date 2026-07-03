import React from 'react';
import { useChallengeDomains } from '../../services/challengesApi';
import { Link } from 'react-router-dom';
import { Code2, Layers, Users, Database, ShieldCheck, Cpu, Terminal } from 'lucide-react';

// Map database string references cleanly to Lucide vector components
const ICON_MAP = {
  Code2: Code2,
  Layers: Layers,
  Users: Users,
  Database: Database,
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
  Terminal: Terminal
};

const ChallengesLanding = () => {
  const { data, isLoading, isError, error } = useChallengeDomains();
  const domains = data?.data || [];

  if (isError) {
    return (
      <div className="min-h-screen bg-zinc-950 text-red-500 flex items-center justify-center font-medium">
        {error?.message || 'Failed to sync with challenge domains data pool'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-12 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Premium Animated Header Area */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Technical Challenges Hub
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Accelerate your engineering intuition. Master core algorithms, low-level design structures, and cutting-edge AI architectures through production-grade challenge workflows.
          </p>
        </div>

        {/* Dynamic State Layout Renderings */}
        {isLoading ? (
          /* Skeleton Loader Array */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-56 bg-zinc-900/50 border border-zinc-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : domains.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 bg-zinc-900/20 border border-zinc-800/50 rounded-2xl">
            No active challenge domains found in the system registry.
          </div>
        ) : (
          /* Production-grade Card Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain) => {
              const IconComponent = ICON_MAP[domain.icon] || Terminal;
              return (
                <div 
                  key={domain._id} 
                  className="group relative bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                >
                  {/* Subtle Glassmorphism Radial Gradient Glow on Card Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    {/* Icon Base Container */}
                    <div className="w-12 h-12 rounded-xl bg-zinc-800/60 flex items-center justify-center border border-zinc-700/50 text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-900/30 group-hover:border-blue-500/30 transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                        {domain.name}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                        {domain.description}
                      </p>
                    </div>
                  </div>

                  {/* Core Action Navigation Link Footer */}
                  <div className="pt-6 relative z-10 mt-auto">
                    <Link
                      to={`/learn/challenges/${domain.slug}`}
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-zinc-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 text-zinc-200 hover:text-white font-semibold text-sm rounded-xl border border-zinc-700/60 hover:border-transparent transition-all duration-300 shadow-sm"
                    >
                      Explore Scope
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengesLanding;