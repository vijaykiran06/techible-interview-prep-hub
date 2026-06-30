import { Routes, Route } from 'react-router-dom';

import CompanyListingPage from '../pages/CompanyListing';
import CompanyDetailPage from '../pages/CompanyDetail';
import ProjectsHub from '../pages/LearnPages/ProjectsHub';

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

      <Route
        path="/learn/projects"
        element={<ProjectsHub />}
      />
    </Routes>
  );
};

export default PublicRoutes;