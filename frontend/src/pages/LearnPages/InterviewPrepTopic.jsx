// frontend/src/pages/LearnPages/InterviewPrepTopic.jsx
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useInterviewQuestions } from '../../services/interviewPrepApi';
import InterviewPrepQuestionCard from './InterviewPrepQuestionCard';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const InterviewPrepTopic = () => {
  const { level, topic } = useParams();
  const navigate = useNavigate();
  const displayLevel = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();

  const { data, isLoading, isError, error } = useInterviewQuestions(level, topic);
  const fullTopicMetadata = data?.data || {};
  const questionSet = fullTopicMetadata.questions || [];

  if (isError) {
    return (
      <div className="text-center py-12 max-w-7xl mx-auto px-4 text-red-600">
        {error?.message || 'Failed to verify explicit category questions.'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2 text-xs text-gray-400 font-medium">
        <Link to="/learn/interview-prep" className="hover:text-blue-600 transition-colors">Interview Prep</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/learn/interview-prep/${level}`} className="hover:text-blue-600 transition-colors">{displayLevel}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-600 truncate">{fullTopicMetadata.title || 'Topic Loading'}</span>
      </div>

      <button 
        onClick={() => navigate(`/learn/interview-prep/${level}`)}
        className="mb-4 flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 font-medium shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Topics
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{fullTopicMetadata.title} Matrix</h1>
        <p className="text-sm text-gray-500 mt-1.5">Review common patterns for engineering interviews at {displayLevel} tiers. Each problem includes a structural blueprint framework.</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((skeletonIndex) => (
            <div key={skeletonIndex} className="h-14 bg-gray-100 border border-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : questionSet.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl text-gray-500 text-sm">
          No problem-sets match this track criteria yet.
        </div>
      ) : (
        <div className="w-full space-y-4">
          {questionSet.map((q, idx) => (
            <InterviewPrepQuestionCard key={idx} questionItem={q} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewPrepTopic;