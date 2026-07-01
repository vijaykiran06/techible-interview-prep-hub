import { Route } from 'react-router-dom';
import CompanyListingPage from '../pages/CompanyListing';
import CompanyDetailPage from '../pages/CompanyDetail';
import AiLearningHub from '../pages/AiLearningHub';
import AiTopicPage from '../pages/AiTopicPage';
import { Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import CompanyListingPage from '../pages/interview/CompanyListing';
import CompanyDetailPage from '../pages/interview/CompanyDetail';
import ProjectsHub from '../pages/LearnPages/ProjectsHub';

const publicRoutes = (
  <>
    <Route path="/interview-prep" element={<CompanyListingPage />} />
    <Route path="/interview-prep/:slug" element={<CompanyDetailPage />} />
    <Route path="/learn/ai" element={<AiLearningHub />} />
    <Route path="/learn/ai/:slug" element={<AiTopicPage />} />
  </>
);
import InterviewPrepHub from '../pages/LearnPages/InterviewPrepHub';
import InterviewPrepLevel from '../pages/LearnPages/InterviewPrepLevel';
import InterviewPrepTopic from '../pages/LearnPages/InterviewPrepTopic';

const PublicRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Interview Prep - Company Listing */}
      <Route
        path="/interview-prep"
        element={<CompanyListingPage />}
      />

      {/* Interview Prep - Company Details */}
      <Route
        path="/interview-prep/:slug"
        element={<CompanyDetailPage />}
      />

      {/* Projects Hub */}
      <Route
        path="/learn/projects"
        element={<ProjectsHub />}
      />

      {/* Interview Prep (Level-Based) */}
      <Route 
        path="/learn/interview-prep" 
        element={<InterviewPrepHub />} 
      />
      <Route 
        path="/learn/interview-prep/:level" 
        element={<InterviewPrepLevel />} 
      />
      <Route 
        path="/learn/interview-prep/:level/:topic" 
        element={<InterviewPrepTopic />} 
      />
    </Routes>
  );
};

export default publicRoutes;