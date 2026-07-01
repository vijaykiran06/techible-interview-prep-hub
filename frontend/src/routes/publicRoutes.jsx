import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";

import CompanyListingPage from "../pages/interview/CompanyListing";
import CompanyDetailPage from "../pages/interview/CompanyDetail";

import AiLearningHub from "../pages/AiLearningHub";
import AiTopicPage from "../pages/AiTopicPage";

import ProjectsHub from "../pages/LearnPages/ProjectsHub";
import InterviewPrepHub from "../pages/LearnPages/InterviewPrepHub";
import InterviewPrepLevel from "../pages/LearnPages/InterviewPrepLevel";
import InterviewPrepTopic from "../pages/LearnPages/InterviewPrepTopic";

const PublicRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Company Interview Prep */}
      <Route path="/interview-prep" element={<CompanyListingPage />} />
      <Route path="/interview-prep/:slug" element={<CompanyDetailPage />} />

      {/* AI Learning */}
      <Route path="/learn/ai" element={<AiLearningHub />} />
      <Route path="/learn/ai/:slug" element={<AiTopicPage />} />

      {/* Projects */}
      <Route path="/learn/projects" element={<ProjectsHub />} />

      {/* Level-based Interview Prep */}
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