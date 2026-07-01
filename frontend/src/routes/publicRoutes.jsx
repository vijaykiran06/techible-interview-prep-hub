import { Routes, Route } from 'react-router-dom';

// 1. Landing Page
import LandingPage from '../pages/LandingPage';

// 2. Company & Interview Prep Pages (Using the new folder structure)
import CompanyListingPage from '../pages/interview/CompanyListing';
import CompanyDetailPage from '../pages/interview/CompanyDetail';

// 3. AI Learning Hub Pages
import AiLearningHub from '../pages/AiLearningHub';
import AiTopicPage from '../pages/AiTopicPage';

// 4. General Interview Prep Learning Pages
import InterviewPrepHub from '../pages/LearnPages/InterviewPrepHub';
import InterviewPrepLevel from '../pages/LearnPages/InterviewPrepLevel';
import InterviewPrepTopic from '../pages/LearnPages/InterviewPrepTopic';

const PublicRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Interview Prep - Companies */}
      <Route path="/interview-prep" element={<CompanyListingPage />} />
      <Route path="/interview-prep/:slug" element={<CompanyDetailPage />} />

      {/* Learn - AI Hub */}
      <Route path="/learn/ai" element={<AiLearningHub />} />
      <Route path="/learn/ai/:slug" element={<AiTopicPage />} />

      {/* Learn - Interview Prep Modules */}
      <Route path="/learn/interview-prep" element={<InterviewPrepHub />} />
      <Route path="/learn/interview-prep/:level" element={<InterviewPrepLevel />} />
      <Route path="/learn/interview-prep/:level/:topic" element={<InterviewPrepTopic />} />
    </Routes>
  );
};

export default PublicRoutes;