// frontend/src/pages/LearnPages/InterviewPrepHub.jsx
import { useNavigate } from 'react-router-dom';
import { useInterviewLevels } from '../../services/interviewPrepApi';
import { Layers, Briefcase, Award, ArrowRight } from 'lucide-react';

// Maps your custom icons and colors directly to his data fields
const ICON_MAP = {
  Easy: <Layers className="w-8 h-8 text-green-600" />,
  Medium: <Briefcase className="w-8 h-8 text-yellow-600" />,
  Hard: <Award className="w-8 h-8 text-red-600" />,
};

const InterviewPrepHub = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useInterviewLevels();

  if (isError) {
    return (
      <div className="text-center py-12 max-w-7xl mx-auto px-4 text-red-600 font-medium">
        {error?.message || 'Failed to initialize system experience tracks.'}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leveled Interview Prep</h1>
        <p className="text-gray-600 mt-2">Choose an interview difficulty tailored to your targeted career scope.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((placeholder) => (
            <div key={placeholder} className="h-56 bg-gray-100 border border-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data?.data?.map((lvl) => (
            <div key={lvl.level} className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                {/* Custom Color Icons (Green/Yellow/Red) matching the string keys */}
                <div className="mb-4 p-3 bg-gray-50 inline-block rounded-xl border border-gray-100">
                  {ICON_MAP[lvl.level] || <Layers className="w-8 h-8 text-blue-600" />}
                </div>

                {/* Explicitly prints 'Easy Track', 'Medium Track', 'Hard Track' */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                  {lvl.level} Track
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{lvl.description}</p>
                
                <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-400">Categories Available:</span>
                    <span className="text-gray-900 font-semibold">{lvl.topicCount} Subjects</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-gray-400">Est. Practice Allocation:</span>
                    <span className="text-gray-900 font-semibold">{lvl.estimatedTime}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/learn/interview-prep/${lvl.level.toLowerCase()}`)}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 group text-sm"
              >
                Start Prep <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewPrepHub;