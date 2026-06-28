// frontend/src/pages/LearnPages/InterviewPrepLevel.jsx
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useInterviewTopics } from '../../services/interviewPrepApi';
import { ChevronRight, ArrowLeft, BookOpen } from 'lucide-react';

const CATEGORY_BADGES = {
  DSA: 'bg-purple-100 text-purple-700',
  'System Design': 'bg-blue-100 text-blue-700',
  Behavioral: 'bg-green-100 text-green-700',
  HR: 'bg-pink-100 text-pink-700',
  'Domain-Specific': 'bg-orange-100 text-orange-700',
};

const InterviewPrepLevel = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const displayLevel = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();

  const { data, isLoading, isError, error } = useInterviewTopics(level);
  const coreTopics = data?.data || [];

  if (isError) {
    return (
      <div className="text-center py-12 max-w-7xl mx-auto px-4 text-red-600">
        {error?.message || 'Failed to read domain module tracks.'}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-xs text-gray-400 font-medium">
        <Link to="/learn/interview-prep" className="hover:text-blue-600 transition-colors">Interview Prep</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600">{displayLevel} Modules</span>
      </div>

      <button 
        onClick={() => navigate('/learn/interview-prep')}
        className="mb-4 flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 font-medium shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Level Selection
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{displayLevel} Interview Frameworks</h1>
        <p className="text-gray-600 mt-2">Select a targeted technical competency domain mapped to {displayLevel} engineering standards.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((loader) => (
            <div key={loader} className="h-32 bg-gray-100 border border-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : coreTopics.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl text-gray-500 text-sm">
          No preparatory categories are currently seeded inside this level track.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreTopics.map((topic) => (
            <div key={topic._id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2 py-1 inline-block text-xs font-semibold rounded-md ${CATEGORY_BADGES[topic.categoryType] || 'bg-gray-100 text-gray-700'}`}>
                    {topic.categoryType}
                  </span>
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> {topic.questionCount} Patterns
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{topic.title}</h3>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700 w-full">
                <button
                  onClick={() => navigate(`/learn/interview-prep/${level}/${topic.slug}`)}
                  className="w-full text-left flex items-center justify-between"
                >
                  <span>Explore Problems</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewPrepLevel;