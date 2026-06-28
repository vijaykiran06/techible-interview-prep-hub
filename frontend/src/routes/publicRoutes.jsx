import { Route } from 'react-router-dom';
import CompanyListingPage from '../pages/CompanyListing';
import CompanyDetailPage from '../pages/CompanyDetail';
import AiLearningHub from '../pages/AiLearningHub';
import AiTopicPage from '../pages/AiTopicPage';

const publicRoutes = (
  <>
    <Route path="/interview-prep" element={<CompanyListingPage />} />
    <Route path="/interview-prep/:slug" element={<CompanyDetailPage />} />
    <Route path="/learn/ai" element={<AiLearningHub />} />
    <Route path="/learn/ai/:slug" element={<AiTopicPage />} />
  </>
);

export default publicRoutes;