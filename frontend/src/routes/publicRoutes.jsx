import { Routes, Route } from 'react-router-dom';

import CompanyListingPage from '../pages/CompanyListing';
import CompanyDetailPage from '../pages/CompanyDetail';

import InterviewPrepHub from '../pages/LearnPages/InterviewPrepHub';
import InterviewPrepLevel from '../pages/LearnPages/InterviewPrepLevel';
import InterviewPrepTopic from '../pages/LearnPages/InterviewPrepTopic';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<CompanyListingPage />}
      />

      <Route
        path="/interview-prep"
        element={<CompanyListingPage />}
      />

      <Route
        path="/interview-prep/:slug"
        element={<CompanyDetailPage />}
      />

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

export default PublicRoutes;