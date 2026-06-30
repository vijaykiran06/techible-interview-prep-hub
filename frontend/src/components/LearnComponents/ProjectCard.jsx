/**
 * ProjectCard.jsx
 * Card component for the Projects Hub (Techible Light Theme).
 * Rule 4: Wrapped in React.memo() — appears in lists.
 * Rule 1: Tailwind CSS only — no inline styles, no CSS modules.
 * Uses relative imports only (Rule 9).
 */

import React from 'react';
import { ChevronRight, Zap } from 'lucide-react';

/** Difficulty badge styles — light mode clean tags */
const DIFFICULTY_CONFIG = {
  Beginner: {
    badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    dot: 'bg-emerald-500',
    label: 'Beginner',
  },
  Intermediate: {
    badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    dot: 'bg-amber-500',
    label: 'Intermediate',
  },
  Advanced: {
    badge: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    dot: 'bg-rose-500',
    label: 'Advanced',
  },
};

const ProjectCard = ({ project, onStartProject }) => {
  const diffConfig = DIFFICULTY_CONFIG[project.difficulty] || DIFFICULTY_CONFIG.Intermediate;

  return (
    <article
      id={`project-card-${project.slug}`}
      className="
        group relative flex flex-col justify-between rounded-2xl overflow-hidden
        bg-zinc-900/40 backdrop-blur-xl border border-white/10
        p-6
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7),0_0_20px_rgba(59,130,246,0.15)]
      "
    >
      <div>
        {/* Card Header — difficulty badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`
              inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold
              ${diffConfig.badge}
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${diffConfig.dot}`} />
            {diffConfig.label}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Tech Stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="
                px-2.5 py-0.5 rounded-md text-xs font-mono font-medium
                bg-zinc-800/80 text-zinc-300 border border-white/5
                transition-all duration-200 hover:bg-zinc-700/80 hover:text-white
              "
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Start Project Button */}
      <button
        id={`btn-start-project-${project.slug}`}
        className="
          w-full flex items-center justify-center gap-2
          px-4 py-2.5 rounded-xl text-sm font-semibold
          bg-gradient-to-r from-blue-600 to-blue-500 text-white
          hover:from-blue-500 hover:to-blue-400
          active:scale-[0.98]
          transition-all duration-300
          group/btn
          shadow-[0_4px_15px_rgba(59,130,246,0.3)]
          hover:shadow-[0_4px_25px_rgba(59,130,246,0.5)]
        "
        onClick={() => {
          if (onStartProject) {
            onStartProject(project);
          }
        }}
        aria-label={`Start project: ${project.title}`}
      >
        <Zap size={14} className="text-white opacity-85 group-hover/btn:scale-110 transition-transform duration-300" />
        Start Project
        <ChevronRight size={14} className="text-white opacity-85 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
      </button>
    </article>
  );
};

// Rule 4: Every card component wrapped in React.memo()
export default React.memo(ProjectCard);
