import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import QuestionAccordion from "../components/QuestionAccording";
import SuccessStoryCard from "../components/SuccessStoryCard";
import CompensationTable from "../components/CompensationTable";
import InterviewTimeline from "../components/InterviewTimeline";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import {
  getCompanyBySlug,
  getInterviewProcess,
  getQuestions,
  getSuccessStories,
  getCompensation,
  getRecentQuestions,
} from "../services/companyApi";

const CompanyDetailPage = () => {
  const { slug } = useParams();

  const [activeTab, setActiveTab] = useState("overview");
  const [questionCategory, setQuestionCategory] =
  useState("All");

const [questionDifficulty, setQuestionDifficulty] =
  useState("All");
  const { data: companyData, isLoading } = useQuery({
    queryKey: ["company", slug],
    queryFn: () => getCompanyBySlug(slug),
  });

  const { data: processData } = useQuery({
    queryKey: ["process", slug],
    queryFn: () => getInterviewProcess(slug),
  });

  const { data: questionsData } = useQuery({
    queryKey: ["questions", slug],
    queryFn: () => getQuestions(slug),
  });

  const { data: storiesData } = useQuery({
    queryKey: ["stories", slug],
    queryFn: () => getSuccessStories(slug),
  });

  const { data: compensationData } = useQuery({
    queryKey: ["compensation", slug],
    queryFn: () => getCompensation(slug),
  });

  const { data: recentQuestionsData } = useQuery({
  queryKey: ["recentQuestions", slug],
  queryFn: () => getRecentQuestions(slug),
});

  if (isLoading) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <LoadingState />
    </div>
  );
}

  const company = companyData?.company;

  const filteredQuestions =
  questionsData?.questions?.filter(
    (question) => {
      const matchesCategory =
        questionCategory === "All" ||
        question.category ===
          questionCategory;

      const matchesDifficulty =
        questionDifficulty === "All" ||
        question.difficulty ===
          questionDifficulty;

      return (
        matchesCategory &&
        matchesDifficulty
      );
    }
  ) || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      {/* Company Header */}
{/* Company Header */}
<div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8">

  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

  <div className="flex flex-col sm:flex-row items-center gap-5">

      {company?.logo?.url ? (
        <img
          src={company.logo.url}
          alt={company.name}
          className="w-20 h-20 rounded-xl bg-white object-contain"
        />
      ) : (
        <div className="w-20 h-20 rounded-xl bg-zinc-700 flex items-center justify-center text-3xl font-bold">
          {company?.name?.charAt(0)}
        </div>
      )}

      <div>
      <h1 className="text-2xl md:text-5xl font-bold">
          {company?.name}
        </h1>

        <p className="text-zinc-400 mt-2">
          {company?.industry}
          {company?.headquarters
            ? ` • ${company.headquarters}`
            : ""}
        </p>
      </div>

    </div>

    <div className="flex flex-wrap gap-3">

      <span className="px-4 py-2 rounded-full bg-yellow-200 text-black">
        {company?.interviewDifficulty}
      </span>

      <span className="px-4 py-2 rounded-full bg-zinc-700">
        👁 {company?.views} Views
      </span>

      {company?.website && (
        <a
          href={company.website}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700"
        >
          Visit Website
        </a>
      )}

    </div>

  </div>

</div>

      {/* Quick Stats */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">
          Quick Stats
        </h2>

<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
  <div className="bg-zinc-900 p-4 rounded-xl">
    Questions
    <div className="text-3xl font-bold">
      {questionsData?.questions?.length || 0}
    </div>
  </div>

  <div className="bg-zinc-900 p-4 rounded-xl">
    Stories
    <div className="text-3xl font-bold">
      {storiesData?.stories?.length || 0}
    </div>
  </div>

  <div className="bg-zinc-900 p-4 rounded-xl">
    Compensation
    <div className="text-3xl font-bold">
      {compensationData?.compensation?.length || 0}
    </div>
  </div>

  <div className="bg-zinc-900 p-4 rounded-xl">
    Recent Questions
    <div className="text-3xl font-bold">
      {recentQuestionsData?.questions?.length || 0}
    </div>
  </div>

  <div className="bg-zinc-900 p-4 rounded-xl">
    Views
    <div className="text-3xl font-bold">
      {company?.views}
    </div>
  </div>
</div>
      </div>

      {/* Tabs */}
      <div className="mt-12 border-b border-zinc-800">
       <div className="flex gap-6 overflow-x-auto whitespace-nowrap pb-2">
       {[
  "overview",
  "process",
  "questions",
  "recent",
  "stories",
  "tips",
  "compensation",
  "resources",
].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-zinc-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
     {/* Tab Content */}
<div className="mt-8">

  {/* Overview */}
  {activeTab === "overview" && (
    <div className="bg-zinc-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Company Overview
      </h2>

      <p className="text-zinc-300">
        {company?.description ||
          "No company description available."}
      </p>
    </div>
  )}

  {/* Interview Process */}
  {activeTab === "process" && (
    <div>
      <div className="bg-zinc-900 rounded-xl p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Interview Process
        </h2>

        <p className="text-zinc-300">
          {processData?.process?.overview ||
            "No interview process information available."}
        </p>
      </div>

      <InterviewTimeline
        process={processData?.process}
      />
    </div>
  )}

  {/* Questions */}
  {activeTab === "questions" && (
  <div>

    {/* Filters */}
    <div className="flex flex-wrap gap-4 mb-6">

      <select
        value={questionCategory}
        onChange={(e) =>
          setQuestionCategory(
            e.target.value
          )
        }
        className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2"
      >
        <option value="All">
          All Categories
        </option>

        <option value="DSA">
          DSA
        </option>

        <option value="System Design">
          System Design
        </option>

        <option value="Behavioral">
          Behavioral
        </option>

        <option value="HR">
          HR
        </option>

        <option value="Domain-Specific">
          Domain-Specific
        </option>
      </select>

      <select
        value={questionDifficulty}
        onChange={(e) =>
          setQuestionDifficulty(
            e.target.value
          )
        }
        className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2"
      >
        <option value="All">
          All Difficulties
        </option>

        <option value="Easy">
          Easy
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="Hard">
          Hard
        </option>
      </select>

    </div>

    {filteredQuestions.length === 0 ? (
      <EmptyState message="No questions found." />
    ) : (
      filteredQuestions.map((question) => (
        <QuestionAccordion
          key={question._id}
          question={question}
        />
      ))
    )}

  </div>
)}


{/* Recent Questions */}
{activeTab === "recent" && (
  <>
    {recentQuestionsData?.questions?.length === 0 ? (
      <EmptyState message="No recent questions available." />
    ) : (
      recentQuestionsData?.questions?.map((question) => (
        <QuestionAccordion
          key={question._id}
          question={question}
        />
      ))
    )}
  </>
)}
  {/* Stories */}
 {activeTab === "stories" && (
  <>
    {storiesData?.stories?.length === 0 ? (
      <EmptyState message="No success stories available yet." />
    ) : (
      <div className="space-y-4">
        {storiesData.stories.map((story) => (
          <SuccessStoryCard
            key={story._id}
            story={story}
          />
        ))}
      </div>
    )}
  </>
)}

{/* Tips */}
{activeTab === "tips" && (
  <div className="space-y-6">

    {/* General Tips */}
    <div className="bg-zinc-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Tips to Crack the Interview
      </h2>

      {processData?.process?.generalTips?.length ? (
        <ul className="space-y-3">
          {processData.process.generalTips.map(
            (tip, index) => (
              <li
                key={index}
                className="flex gap-3 text-zinc-300"
              >
                <span>✅</span>
                <span>{tip}</span>
              </li>
            )
          )}
        </ul>
      ) : (
        <EmptyState message="No tips available." />
      )}
    </div>

    {/* Phase Wise Tips */}
    <div className="bg-zinc-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">
        Interview Rounds Overview
      </h3>

      <div className="space-y-4">
        {processData?.process?.phases?.map(
          (phase) => (
            <div
              key={phase._id}
              className="border border-zinc-800 rounded-lg p-4"
            >
              <h4 className="font-semibold">
                Round {phase.order}: {phase.name}
              </h4>

              <p className="text-zinc-400 mt-2">
                Tests: {phase.whatItTests}
              </p>

              <p className="text-zinc-500 text-sm mt-1">
                Format: {phase.format}
              </p>
            </div>
          )
        )}
      </div>
    </div>

    {/* Do's and Don'ts */}
    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-zinc-900 rounded-xl p-6">
        <h3 className="text-green-400 font-bold text-xl mb-4">
          Do's
        </h3>

        <ul className="space-y-2 text-zinc-300">
          <li>✅ Explain your thought process</li>
          <li>✅ Communicate clearly</li>
          <li>✅ Ask clarifying questions</li>
          <li>✅ Practice mock interviews</li>
        </ul>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6">
        <h3 className="text-red-400 font-bold text-xl mb-4">
          Don'ts
        </h3>

        <ul className="space-y-2 text-zinc-300">
          <li>❌ Jump into coding immediately</li>
          <li>❌ Ignore edge cases</li>
          <li>❌ Stay silent when stuck</li>
          <li>❌ Memorize answers blindly</li>
        </ul>
      </div>

    </div>
  </div>
)}

  {/* Compensation */}
 {activeTab === "compensation" && (
  <div className="space-y-6">

    <div className="grid md:grid-cols-3 gap-4">

      <div className="bg-zinc-900 rounded-xl p-6">
        <h3 className="text-zinc-400">
          Fresher Average CTC
        </h3>

        <p className="text-2xl font-bold mt-2">
          ₹
          {compensationData?.compensation
            ?.filter(
              (item) => item.level === "Fresher"
            )
            ?.reduce(
              (sum, item) =>
                sum +
                (item.minSalary +
                  item.maxSalary) /
                  2,
              0
            ) || 0}
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6">
        <h3 className="text-zinc-400">
          Mid-Level Average CTC
        </h3>

        <p className="text-2xl font-bold mt-2">
          Based on available data
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6">
        <h3 className="text-zinc-400">
          Senior Average CTC
        </h3>

        <p className="text-2xl font-bold mt-2">
          Based on available data
        </p>
      </div>

    </div>

    <CompensationTable
      compensation={
        compensationData?.compensation
      }
    />

  </div>
)}

{activeTab  === "resources" && (
  <div className="space-y-6">

    <div className="bg-zinc-900 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">
        Recommended Resources
      </h2>

      <p className="text-zinc-400">
        Curated preparation resources for {company?.name} interviews
      </p>
    </div>

    {/* DSA */}
    <div className="bg-zinc-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">
        DSA Preparation
      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        <a
          href="https://neetcode.io/roadmap"
          target="_blank"
          rel="noreferrer"
          className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700"
        >
          🚀 NeetCode Roadmap
        </a>

        <a
          href="https://leetcode.com/problem-list/top-interview-questions/"
          target="_blank"
          rel="noreferrer"
          className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700"
        >
          💻 LeetCode Top Interview Questions
        </a>

        <a
          href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"
          target="_blank"
          rel="noreferrer"
          className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700"
        >
          📚 Striver SDE Sheet
        </a>

        <a
          href="https://www.geeksforgeeks.org/dsa/"
          target="_blank"
          rel="noreferrer"
          className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700"
        >
          📖 GeeksForGeeks DSA
        </a>

      </div>
    </div>

    {/* System Design */}
    <div className="bg-zinc-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">
        System Design
      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        <a
          href="https://github.com/donnemartin/system-design-primer"
          target="_blank"
          rel="noreferrer"
          className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700"
        >
          🏗 System Design Primer
        </a>

        <a
          href="https://bytebytego.com"
          target="_blank"
          rel="noreferrer"
          className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700"
        >
          ⚡ ByteByteGo
        </a>

      </div>
    </div>

    {/* Behavioral */}
    <div className="bg-zinc-900 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">
        Behavioral Interviews
      </h3>

      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-zinc-800 p-4 rounded-lg">
          ⭐ STAR Method Framework
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          🎯 Leadership Principles Preparation
        </div>

      </div>
    </div>

  </div>
)}

</div>
    </div>
  );
};

export default CompanyDetailPage;