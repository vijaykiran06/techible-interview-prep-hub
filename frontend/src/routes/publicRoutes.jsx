import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";

// Interview Prep
import CompanyListingPage from "../pages/interview/CompanyListing";
import CompanyDetailPage from "../pages/interview/CompanyDetail";

// AI Learning Hub
import AiLearningHub from "../pages/AiLearningHub";
import AiTopicPage from "../pages/AiTopicPage";

// Learn Pages
import InterviewPrepHub from "../pages/LearnPages/InterviewPrepHub";
import InterviewPrepLevel from "../pages/LearnPages/InterviewPrepLevel";
import InterviewPrepTopic from "../pages/LearnPages/InterviewPrepTopic";
import ProjectsHub from "../pages/LearnPages/ProjectsHub";

const PublicRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Company Interview Prep */}
      <Route path="/interview-prep" element={<CompanyListingPage />} />
      <Route path="/interview-prep/:slug" element={<CompanyDetailPage />} />

      {/* AI Learning Hub */}
      <Route path="/learn/ai" element={<AiLearningHub />} />
      <Route path="/learn/ai/:slug" element={<AiTopicPage />} />

      {/* Interview Prep Learning Hub */}
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

      {/* Projects Hub */}
      <Route
        path="/learn/projects"
        element={<ProjectsHub />}
      />
    </Routes>
  );
};

export default PublicRoutes;