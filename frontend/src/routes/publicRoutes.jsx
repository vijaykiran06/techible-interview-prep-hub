import React from "react";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop";

import LandingPage from "../pages/LandingPage";

import CompanyListingPage from "../pages/interview/CompanyListing";
import CompanyDetailPage from "../pages/interview/CompanyDetail";

import AiLearningHub from "../pages/AiLearningHub";
import AiTopicPage from "../pages/AiTopicPage";

import ProjectsHub from "../pages/LearnPages/ProjectsHub";
import InterviewPrepHub from "../pages/LearnPages/InterviewPrepHub";
import InterviewPrepLevel from "../pages/LearnPages/InterviewPrepLevel";
import InterviewPrepTopic from "../pages/LearnPages/InterviewPrepTopic";

// Module 2: Technical Challenges
const ChallengesLanding = React.lazy(() =>
  import("../pages/LearnPages/ChallengesLanding")
);
const ChallengeDomainPage = React.lazy(() =>
  import("../pages/LearnPages/ChallengeDomainPage")
);
const ChallengeCategoryPage = React.lazy(() =>
  import("../pages/LearnPages/ChallengeCategoryPage")
);
const ChallengeDetailPage = React.lazy(() =>
  import("../pages/LearnPages/ChallengeDetailPage")
);

const PublicRoutes = () => {
  return (
    <>
      <ScrollToTop />

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

        {/* Interview Prep */}
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

        {/* Technical Challenges */}
        <Route
          path="/learn/challenges"
          element={<ChallengesLanding />}
        />
        <Route
          path="/learn/challenges/:domain"
          element={<ChallengeDomainPage />}
        />
        <Route
          path="/learn/challenges/:domain/:category"
          element={<ChallengeCategoryPage />}
        />
        <Route
          path="/learn/challenges/:domain/:category/:slug"
          element={<ChallengeDetailPage />}
        />
      </Routes>
    </>
  );
};

export default PublicRoutes;