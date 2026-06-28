<<<<<<< HEAD
import AiLearningHub from "../pages/AiLearningHub";
import AiTopicPage   from "../pages/AiTopicPage";

const publicRoutes = (
  <>
    <Route path="/learn/ai"       element={<AiLearningHub />} />
    <Route path="/learn/ai/:slug" element={<AiTopicPage />} />
  </>
);

export default publicRoutes;
=======
import { Routes, Route } from 'react-router-dom';

import CompanyListingPage from '../pages/CompanyListing';
import CompanyDetailPage from '../pages/CompanyDetail';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<CompanyListingPage />}
      />

      <Route
        path ="/interview-prep"
        element={<CompanyListingPage />}
      />

      <Route
        path ="/interview-prep/:slug"
        element={<CompanyDetailPage />}
      />
    </Routes>
  );
};

export default PublicRoutes;
>>>>>>> 2fc883e04fed6d0f431bc0aa49715f5e149938c0
