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