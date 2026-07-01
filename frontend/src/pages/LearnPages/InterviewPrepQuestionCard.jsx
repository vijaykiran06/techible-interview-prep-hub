import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, HelpCircle } from 'lucide-react';

const InterviewPrepQuestionCard = ({ questionItem, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-xl overflow-hidden mb-4 transition-all duration-300 hover:border-zinc-700/60">
      
      {/* Accordion Header Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-zinc-800/30 transition-colors duration-150 gap-4 focus:outline-none group"
      >
        <div className="flex items-start gap-4">
          <HelpCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
          <div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">
              Problem {index + 1} • {questionItem.difficulty || 'Core Pattern'}
            </span>
            <h4 className="text-base font-bold text-white leading-snug group-hover:text-blue-400 transition-colors duration-200">
              {questionItem.question}
            </h4>
          </div>
        </div>
        <div className="text-zinc-400 flex-shrink-0 p-1.5 bg-zinc-950 rounded-xl border border-zinc-800/60 transition-colors group-hover:text-zinc-200 group-hover:border-zinc-700/60">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Accordion Content Panel */}
      {isOpen && (
        <div className="px-6 pb-6 pt-3 border-t border-zinc-800/60 bg-zinc-900/20 space-y-5 text-sm">
          
          {/* Core Framework Blueprint */}
          <div className="space-y-1.5">
            <h5 className="text-[10px] font-black uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
              Architectural Blueprint / Pattern
            </h5>
            <p className="text-zinc-200 font-semibold pl-3 border-l-2 border-purple-500/40">
              {questionItem.pattern || 'Standard Execution Context'}
            </p>
          </div>

          {/* Strategic Solution Framework */}
          <div className="space-y-1.5">
            <h5 className="text-[10px] font-black uppercase tracking-wider text-blue-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              Strategic Resolution Approach
            </h5>
            <p className="text-zinc-300 leading-relaxed pl-3 border-l-2 border-blue-500/40 whitespace-pre-line text-xs">
              {questionItem.approach}
            </p>
          </div>

          {/* Things to Keep in Mind Checkpoints */}
          {questionItem.thingsToKeepInMind && questionItem.thingsToKeepInMind.length > 0 && (
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 shadow-inner">
              <h5 className="text-[10px] font-black uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400/80" />
                Critical Constraints & Corner Cases
              </h5>
              <ul className="space-y-2 text-xs text-amber-200/80 font-medium pl-0.5">
                {questionItem.thingsToKeepInMind.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-amber-500/60 mt-0.5 font-bold">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewPrepQuestionCard;