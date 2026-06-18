import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, HelpCircle } from 'lucide-react';

const InterviewPrepQuestionCard = ({ questionItem, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-4">
      {/* Accordion Header Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-150 gap-4"
      >
        <div className="flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-0.5">
              Problem {index + 1} • {questionItem.difficulty || 'Core Pattern'}
            </span>
            <h4 className="text-base font-semibold text-gray-900 leading-snug">
              {questionItem.question}
            </h4>
          </div>
        </div>
        <div className="text-gray-400 flex-shrink-0 p-1 bg-gray-50 rounded-md border border-gray-100">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Accordion Content Panel */}
      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-gray-100 bg-gray-50/50 space-y-4 text-sm">
          {/* Core Framework Blueprint */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
              Architectural Blueprint / Pattern
            </h5>
            <p className="text-gray-900 font-medium pl-3 border-l-2 border-purple-200">
              {questionItem.pattern || 'Standard Execution Context'}
            </p>
          </div>

          {/* Strategic Solution Framework */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
              Strategic Resolution Approach
            </h5>
            <p className="text-gray-700 leading-relaxed pl-3 border-l-2 border-blue-200 whitespace-pre-line">
              {questionItem.approach}
            </p>
          </div>

          {/* Things to Keep in Mind Checkpoints */}
          {questionItem.thingsToKeepInMind && questionItem.thingsToKeepInMind.length > 0 && (
            <div className="bg-amber-50/60 border border-amber-100 rounded-lg p-3.5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                Critical Constraints & Corner Cases
              </h5>
              <ul className="space-y-1.5 text-xs text-amber-900 font-medium pl-1">
                {questionItem.thingsToKeepInMind.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span className="leading-normal">{item}</span>
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