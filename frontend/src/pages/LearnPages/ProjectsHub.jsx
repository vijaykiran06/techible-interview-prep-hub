/**
 * ProjectsHub.jsx
 * Page: /learn/projects (Techible Light Theme)
 * 
 * Rule 1: Tailwind CSS only — no CSS modules, no inline styles.
 * Rule 9: Relative imports only.
 * No backend integration, no API calls, no Redux, no React Query,
 * no search, no filters, no pagination.
 */

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';

import ProjectCard from '../../components/LearnComponents/ProjectCard';
import projectSeedData from '../../data/projectSeedData';

const ProjectsHub = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased relative overflow-hidden font-sans">
      {/* Premium Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/10 via-cyan-900/5 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Minimal Techible-Style Header Section */}
      <header className="border-b border-white/5 relative bg-zinc-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-4" aria-label="Breadcrumb">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Learn</span>
            <ChevronRight size={12} className="text-zinc-600" />
            <span className="text-blue-400 font-semibold">Projects Hub</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-300 text-xs font-semibold mb-4 backdrop-blur-sm shadow-inner">
            Project Ideas & Challenges
          </div>

          {/* Title and description */}
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Projects Hub
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
            Explore beginner, intermediate, and advanced project ideas across multiple technologies and domains.
          </p>
        </div>
      </header>

      {/* Projects Grid Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectSeedData.map((project) => (
            <ProjectCard key={project.id} project={project} onStartProject={setSelectedProject} />
          ))}
        </div>
      </main>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="bg-zinc-950/95 border-white/10 text-white shadow-2xl max-w-md rounded-3xl p-6 backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="text-white font-bold text-xl tracking-tight">{selectedProject?.title}</DialogTitle>
            <DialogDescription className="text-zinc-400 text-sm mt-1.5">
              Detailed design specification, setup, and key requirements.
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <div className="mt-4 space-y-4 text-sm text-zinc-300">
              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Difficulty Level</h4>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  selectedProject.difficulty === 'Beginner'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : selectedProject.difficulty === 'Intermediate'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    selectedProject.difficulty === 'Beginner'
                      ? 'bg-emerald-500'
                      : selectedProject.difficulty === 'Intermediate'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`} />
                  {selectedProject.difficulty}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium border bg-zinc-800/80 text-zinc-300 border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">URL Identifier (Slug)</h4>
                <code className="text-xs font-mono bg-zinc-900/80 px-2.5 py-1.5 rounded-lg border border-white/5 text-zinc-300 block w-full truncate">
                  {selectedProject.slug}
                </code>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setSelectedProject(null)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.5)] active:scale-95"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsHub;
