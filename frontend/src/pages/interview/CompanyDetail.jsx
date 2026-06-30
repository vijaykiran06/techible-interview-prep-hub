import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import QuestionAccordion from "../../components/interview/QuestionAccording";
import SuccessStoryCard from "../../components/interview/SuccessStoryCard";
import CompensationTable from "../../components/interview/CompensationTable";
import InterviewTimeline from "../../components/interview/InterviewTimeline";

import EmptyState from "../../components/EmptyState";
import LoadingState from "../../components/LoadingState";

import {
  getCompanyBySlug,
  getInterviewProcess,
  getQuestions,
  getSuccessStories,
  getCompensation,
  getRecentQuestions,
} from "../../services/companyApi";

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
{/* ================= COMPANY HERO ================= */}

<div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-[#10172d] to-[#0b1120] p-8 lg:p-10">

  {/* Glow */}
  <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
  <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>

  <div className="relative z-10">

    <div className="flex flex-col lg:flex-row justify-between gap-10">

      {/* Left */}

      <div className="flex flex-col md:flex-row gap-6 items-start">

        {company?.logo?.url ? (
          <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center overflow-hidden">
            <img
              src={company.logo.url}
              alt={company.name}
              className="w-20 h-20 object-contain"
            />
          </div>
        ) : (
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-5xl font-bold">
            {company?.name?.charAt(0)}
          </div>
        )}

        <div>

          <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm">
            Company Interview Guide
          </span>

       <h1 className="mt-5 text-4xl lg:text-5xl font-extrabold tracking-tight">
            {company?.name}
          </h1>

          <p className="mt-3 text-zinc-400 text-lg">
            {company?.industry}
            {company?.headquarters &&
              ` • ${company.headquarters}`}
          </p>

          <p className="mt-6 text-zinc-300 leading-8 max-w-3xl">
            {company?.description ||
              "Prepare with real interview experiences, coding questions, interview process, compensation insights and preparation resources."}
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex flex-col gap-4 min-w-[240px]">

        <div
          className={`px-5 py-3 rounded-2xl text-center font-semibold ${
            company?.interviewDifficulty === "Easy"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : company?.interviewDifficulty === "Medium"
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"
          }`}
        >
          {company?.interviewDifficulty} Interview
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">

          <div className="text-zinc-400 text-sm">
            Total Views
          </div>

          <div className="text-4xl font-bold mt-2">
            {company?.views || 0}
          </div>

        </div>

        {company?.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-center py-4 font-semibold hover:scale-[1.02] transition-all"
          >
            Visit Website →
          </a>
        )}

      </div>

    </div>

  </div>

</div>

      {/* ================= QUICK STATS ================= */}

<div className="mt-12">

  <div className="flex items-center justify-between mb-6">
    <h2 className="text-3xl font-bold">
      Quick Stats
    </h2>

    <span className="text-zinc-500">
      Interview Insights
    </span>
  </div>

  <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">

    <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-5 hover:border-blue-500 transition">

      <div className="text-4xl">📄</div>

      <h3 className="mt-5 text-4xl font-bold">
        {questionsData?.questions?.length || 0}
      </h3>

      <p className="mt-2 text-zinc-400">
        Questions
      </p>

    </div>

    <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 hover:border-purple-500 transition">

      <div className="text-4xl">🏆</div>

      <h3 className="mt-5 text-4xl font-bold">
        {storiesData?.stories?.length || 0}
      </h3>

      <p className="mt-2 text-zinc-400">
        Success Stories
      </p>

    </div>

    <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 hover:border-green-500 transition">

      <div className="text-4xl">₹</div>

      <h3 className="mt-5 text-4xl font-bold">
        {compensationData?.compensation?.length || 0}
      </h3>

      <p className="mt-2 text-zinc-400">
        Salary Reports
      </p>

    </div>

    <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 hover:border-yellow-500 transition">

      <div className="text-4xl">⏱</div>

      <h3 className="mt-5 text-4xl font-bold">
        {recentQuestionsData?.questions?.length || 0}
      </h3>

      <p className="mt-2 text-zinc-400">
        Recent Questions
      </p>

    </div>

    <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 hover:border-cyan-500 transition">

      <div className="text-4xl">◉</div>

      <h3 className="mt-5 text-4xl font-bold">
        {company?.views || 0}
      </h3>

      <p className="mt-2 text-zinc-400">
        Total Views
      </p>

    </div>

  </div>

</div>

      {/* ================= TABS ================= */}

<div className="sticky top-4 z-30 mt-10">
<div className="rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl p-2">

    <div className="flex gap-3 overflow-x-auto scrollbar-hide">

      {[
        {
          id: "overview",
          icon: "⌂",
          label: "Overview",
        },
        {
          id: "process",
          icon: "◉",
          label: "Process",
        },
        {
          id: "questions",
          icon: "</>",
          label: "Questions",
        },
        {
          id: "recent",
          icon: "⏱",
          label: "Recent",
        },
        {
          id: "stories",
          icon: "★",
          label: "Stories",
        },
        {
          id: "tips",
          icon: "✦",
          label: "Tips",
        },
        {
          id: "compensation",
          icon: "₹",
          label: "Compensation",
        },
        {
          id: "resources",
          icon: "📖",
          label: "Resources",
        },
      ].map((tab) => (

        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 whitespace-nowrap rounded-2xl px-6 py-3 font-medium transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>

      ))}

    </div>

  </div>

</div>

{/* ================= TAB CONTENT ================= */}

<div className="mt-10">
 {/* ================= OVERVIEW ================= */}

{activeTab === "overview" && (
  <div className="space-y-8">

    {/* About */}
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-8">

      <h2 className="text-3xl font-bold mb-6">
        About {company?.name}
      </h2>

      <p className="text-zinc-300 leading-8 text-lg">
        {company?.description ||
          "No company description available."}
      </p>

    </div>

    {/* Company Highlights */}

    <div className="grid md:grid-cols-3 gap-6">

      <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:border-blue-500 transition">

        <div className="text-4xl">⌘</div>

        <h3 className="mt-5 text-xl font-semibold">
          Industry
        </h3>

        <p className="mt-3 text-zinc-400">
          {company?.industry || "N/A"}
        </p>

      </div>

      <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:border-green-500 transition">

        <div className="text-4xl">▣</div>

        <h3 className="mt-5 text-xl font-semibold">
          Headquarters
        </h3>

        <p className="mt-3 text-zinc-400">
          {company?.headquarters || "Not Available"}
        </p>

      </div>

      <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:border-purple-500 transition">

        <div className="text-4xl">◆</div>

        <h3 className="mt-5 text-xl font-semibold">
          Interview Difficulty
        </h3>

        <p
          className={`mt-3 font-semibold ${
            company?.interviewDifficulty === "Easy"
              ? "text-green-400"
              : company?.interviewDifficulty === "Medium"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {company?.interviewDifficulty}
        </p>

      </div>

    </div>

    {/* Preparation Roadmap */}

    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/20 to-zinc-900 p-8">

      <h2 className="text-2xl font-bold mb-8">
        Preparation Roadmap
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <div className="relative rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:border-blue-500 transition-all">
          <div className="text-3xl"></div>

          <h4 className="mt-4 font-semibold">
            Learn Fundamentals
          </h4>

          <p className="mt-2 text-sm text-zinc-400">
            Master DSA, OOPs, DBMS, OS and Computer Networks.
          </p>
        </div>

        <div className="relative rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:border-blue-500 transition-all">
          <div className="text-3xl"></div>

          <h4 className="mt-4 font-semibold">
            Coding Practice
          </h4>

          <p className="mt-2 text-sm text-zinc-400">
            Solve interview questions and company tagged problems.
          </p>
        </div>

        <div className="relative rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:border-blue-500 transition-all">
          <div className="text-3xl"></div>

          <h4 className="mt-4 font-semibold">
            Mock Interviews
          </h4>

          <p className="mt-2 text-sm text-zinc-400">
            Practice explaining your approach confidently.
          </p>
        </div>

        <div className="relative rounded-3xl border border-white/10 bg-zinc-900 p-6 hover:border-blue-500 transition-all">
          <div className="text-3xl"></div>

          <h4 className="mt-4 font-semibold">
            Crack Interview
          </h4>

          <p className="mt-2 text-sm text-zinc-400">
            Revise frequently and perform confidently on interview day.
          </p>
        </div>

      </div>

    </div>

  </div>
)}

{/* ================= INTERVIEW PROCESS ================= */}

{activeTab === "process" && (
  <div className="space-y-8">

    {/* Overview */}

    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-8">

      <h2 className="text-3xl font-bold mb-5">
        Interview Process
      </h2>

      <p className="text-zinc-300 leading-8">
        {processData?.process?.overview ||
          "No interview process available."}
      </p>

    </div>

    {/* Timeline */}

    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">

      <h2 className="text-2xl font-bold mb-8">
        Hiring Timeline
      </h2>

      <InterviewTimeline
        process={processData?.process}
      />

    </div>

    {/* Interview Rounds */}

    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">

      <h2 className="text-2xl font-bold mb-8">
        Interview Rounds
      </h2>

      <div className="space-y-6">

        {processData?.process?.phases?.map(
          (phase) => (

            <div
              key={phase._id}
              className="rounded-2xl border border-white/10 bg-zinc-800/50 p-6 hover:border-blue-500 transition"
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-4">

                <div>

                  <span className="text-sm text-blue-400 font-semibold">
                    ROUND {phase.order}
                  </span>

                  <h3 className="text-2xl font-bold mt-2">
                    {phase.name}
                  </h3>

                  <p className="mt-4 text-zinc-400">
                    {phase.whatItTests}
                  </p>

                </div>

                <div className="flex flex-wrap gap-3 h-fit">

                  <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400">
                    {phase.format}
                  </span>

                  {phase.duration && (
                    <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                      ⏱ {phase.duration}
                    </span>
                  )}

                </div>

              </div>

              {phase.topics?.length > 0 && (

                <div className="mt-6">

                  <h4 className="font-semibold mb-3">
                    Topics Covered
                  </h4>

                  <div className="flex flex-wrap gap-3">

                    {phase.topics.map((topic, index) => (

                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-zinc-700 text-zinc-300"
                      >
                        {topic}
                      </span>

                    ))}

                  </div>

                </div>

              )}

            </div>

          )
        )}

      </div>

    </div>

  </div>
)}

 {/* ================= QUESTIONS ================= */}

{activeTab === "questions" && (
  <div className="space-y-8">

    {/* Filters */}

    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6">

      <div className="flex flex-col md:flex-row gap-5">

        <select
          value={questionCategory}
          onChange={(e) =>
            setQuestionCategory(e.target.value)
          }
          className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-800 px-5 py-4 text-white outline-none focus:border-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="DSA">DSA</option>
          <option value="System Design">
            System Design
          </option>
          <option value="Behavioral">
            Behavioral
          </option>
          <option value="HR">HR</option>
          <option value="Domain-Specific">
            Domain Specific
          </option>
        </select>

        <select
          value={questionDifficulty}
          onChange={(e) =>
            setQuestionDifficulty(
              e.target.value
            )
          }
          className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-800 px-5 py-4 text-white outline-none focus:border-blue-500"
        >
          <option value="All">
            All Difficulties
          </option>

          <option value="Easy">Easy</option>

          <option value="Medium">
            Medium
          </option>

          <option value="Hard">Hard</option>

        </select>

      </div>

    </div>

    {/* Stats */}

    <div className="grid md:grid-cols-3 gap-5">

      <div className="rounded-2xl bg-zinc-900 border border-white/10 p-6">

        <div className="text-3xl">▣</div>

        <h3 className="text-3xl font-bold mt-4">
          {filteredQuestions.length}
        </h3>

        <p className="text-zinc-400 mt-2">
          Filtered Questions
        </p>

      </div>

      <div className="rounded-2xl bg-zinc-900 border border-white/10 p-6">

        <div className="text-3xl">◈</div>

        <h3 className="text-3xl font-bold mt-4">
          {questionCategory}
        </h3>

        <p className="text-zinc-400 mt-2">
          Category
        </p>

      </div>

      <div className="rounded-2xl bg-zinc-900 border border-white/10 p-6">

        <div className="text-3xl">◆</div>

        <h3 className="text-3xl font-bold mt-4">
          {questionDifficulty}
        </h3>

        <p className="text-zinc-400 mt-2">
          Difficulty
        </p>

      </div>

    </div>

    {/* Questions */}

    {filteredQuestions.length === 0 ? (

      <EmptyState
        message="No questions found."
      />

    ) : (

      <div className="space-y-5">

        {filteredQuestions.map((question) => (

          <div
            key={question._id}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-1 hover:border-blue-500 transition"
          >

            <div className="rounded-[22px] bg-zinc-900">

              <QuestionAccordion
                question={question}
              />

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
)}


{/* ================= RECENT QUESTIONS ================= */}

{activeTab === "recent" && (
  <div className="space-y-8">

    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-8">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            Recent Interview Questions
          </h2>

          <p className="text-zinc-400 mt-2">
            Latest interview experiences shared by candidates.
          </p>
        </div>

        <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600 text-4xl">
          🔥
        </div>

      </div>

    </div>

    <div className="grid gap-6">

      {recentQuestionsData?.questions?.length === 0 ? (

        <EmptyState
          message="No recent questions available."
        />

      ) : (

        recentQuestionsData.questions.map((question, index) => (

          <div
            key={question._id}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-1 hover:border-blue-500 transition-all duration-300"
          >

            <div className="rounded-[22px] bg-zinc-900 p-1">

              <div className="flex items-center justify-between px-5 pt-5">

                <span className="text-blue-400 text-sm font-semibold">
                  Question #{index + 1}
                </span>

                <div className="flex gap-2">

                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      question.difficulty === "Easy"
                        ? "bg-green-500/20 text-green-400"
                        : question.difficulty === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {question.difficulty}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                    {question.category}
                  </span>

                </div>

              </div>

              <QuestionAccordion
                question={question}
              />

            </div>

          </div>

        ))

      )}

    </div>

  </div>
)}
{/* ================= SUCCESS STORIES ================= */}

{activeTab === "stories" && (
  <div className="space-y-8">

    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-blue-950/20 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            Success Stories
          </h2>

          <p className="text-zinc-400 mt-2">
            Learn from candidates who cracked {company?.name}.
          </p>

        </div>

        <div className="hidden md:flex w-20 h-20 rounded-3xl bg-yellow-500/20 items-center justify-center text-5xl">
          🏆
        </div>

      </div>

    </div>

    {storiesData?.stories?.length === 0 ? (

      <EmptyState
        message="No success stories available yet."
      />

    ) : (

      <div className="grid lg:grid-cols-2 gap-8">

        {storiesData.stories.map((story) => (

          <div
            key={story._id}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 hover:border-yellow-500 transition-all duration-300 overflow-hidden"
          >

            <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500"></div>

            <div className="p-8">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center text-2xl">
                    👨‍💻
                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      {story.name || "Anonymous"}
                    </h3>

                    <p className="text-zinc-400 text-sm">
                      Selected Candidate
                    </p>

                  </div>

                </div>

                <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm">
                  Selected
                </span>

              </div>

              <div className="mt-8">

                <SuccessStoryCard
                  story={story}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
)}

{/* ================= TIPS ================= */}

{activeTab === "tips" && (
  <div className="space-y-8">

    {/* Hero */}

    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/20 via-zinc-900 to-zinc-900 p-8">

      <h2 className="text-3xl font-bold">
        Crack the Interview
      </h2>

      <p className="text-zinc-400 mt-3">
        Best practices followed by candidates who successfully cleared the interview.
      </p>

    </div>

    {/* General Tips */}

    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">

      <h3 className="text-2xl font-bold mb-8">
        General Preparation Tips
      </h3>

      {processData?.process?.generalTips?.length ? (

        <div className="grid md:grid-cols-2 gap-5">

          {processData.process.generalTips.map(
            (tip, index) => (

              <div
                key={index}
                className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 flex gap-4"
              >

                <div className="text-2xl">
                  ✅
                </div>

                <div className="text-zinc-300">
                  {tip}
                </div>

              </div>

            )
          )}

        </div>

      ) : (

        <EmptyState message="No tips available." />

      )}

    </div>

    {/* Round Wise Tips */}

    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">

      <h3 className="text-2xl font-bold mb-8">
        Round-wise Preparation
      </h3>

      <div className="space-y-6">

        {processData?.process?.phases?.map((phase) => (

          <div
            key={phase._id}
            className="rounded-2xl border border-white/10 bg-zinc-800/40 p-6 hover:border-blue-500 transition"
          >

            <div className="flex justify-between flex-wrap gap-4">

              <div>

                <span className="text-blue-400 font-semibold">
                  ROUND {phase.order}
                </span>

                <h3 className="text-2xl font-bold mt-2">
                  {phase.name}
                </h3>

              </div>

              <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 h-fit">
                {phase.format}
              </span>

            </div>

            <p className="mt-5 text-zinc-400 leading-8">
              {phase.whatItTests}
            </p>

          </div>

        ))}

      </div>

    </div>

    {/* Do's and Don'ts */}

    <div className="grid lg:grid-cols-2 gap-8">

      <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-8">

        <h3 className="text-2xl font-bold text-green-400 mb-6">
          ✅ Do's
        </h3>

        <ul className="space-y-4 text-zinc-300">

          <li>✔ Explain your approach before coding.</li>

          <li>✔ Think aloud throughout the interview.</li>

          <li>✔ Handle edge cases carefully.</li>

          <li>✔ Ask clarifying questions.</li>

          <li>✔ Practice mock interviews regularly.</li>

        </ul>

      </div>

      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8">

        <h3 className="text-2xl font-bold text-red-400 mb-6">
          ❌ Don'ts
        </h3>

        <ul className="space-y-4 text-zinc-300">

          <li>✖ Rush into coding immediately.</li>

          <li>✖ Stay silent when stuck.</li>

          <li>✖ Ignore interviewer hints.</li>

          <li>✖ Skip testing your solution.</li>

          <li>✖ Memorize answers without understanding.</li>

        </ul>

      </div>

    </div>

  </div>
)}

  {/* ================= COMPENSATION ================= */}

{activeTab === "compensation" && (
  <div className="space-y-8">

    {/* Header */}

    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-900/20 via-zinc-900 to-zinc-900 p-8">

      <h2 className="text-3xl font-bold">
        Compensation Insights
      </h2>

      <p className="text-zinc-400 mt-3">
        Salary trends reported by candidates across different experience levels.
      </p>

    </div>

    {/* Salary Cards */}

    <div className="grid md:grid-cols-3 gap-6">

      {/* Fresher */}

      <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-zinc-900 to-zinc-800 p-8">

        <div className="text-4xl">🎓</div>

        <h3 className="mt-6 text-lg text-zinc-400">
          Fresher Average CTC
        </h3>

        <h2 className="mt-3 text-4xl font-bold text-blue-400">

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

        </h2>

      </div>

      {/* Mid */}

      <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-zinc-900 to-zinc-800 p-8">

        <div className="text-4xl">💼</div>

        <h3 className="mt-6 text-lg text-zinc-400">
          Mid Level
        </h3>

        <h2 className="mt-3 text-4xl font-bold text-purple-400">
          Competitive
        </h2>

        <p className="mt-4 text-zinc-500">
          Based on available salary reports.
        </p>

      </div>

      {/* Senior */}

      <div className="rounded-3xl border border-green-500/20 bg-gradient-to-br from-zinc-900 to-zinc-800 p-8">

        <div className="text-4xl">🚀</div>

        <h3 className="mt-6 text-lg text-zinc-400">
          Senior Level
        </h3>

        <h2 className="mt-3 text-4xl font-bold text-green-400">
          High Package
        </h2>

        <p className="mt-4 text-zinc-500">
          Compensation grows significantly with experience.
        </p>

      </div>

    </div>

    {/* Salary Table */}

    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">

      <h3 className="text-2xl font-bold mb-8">
        Detailed Salary Breakdown
      </h3>

      <CompensationTable
        compensation={
          compensationData?.compensation
        }
      />

    </div>

  </div>
)}

{/* ================= RESOURCES ================= */}

{activeTab === "resources" && (
  <div className="space-y-8">

    {/* Header */}

    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-900/20 via-zinc-900 to-zinc-900 p-8">

      <h2 className="text-3xl font-bold">
        Learning Resources
      </h2>

      <p className="text-zinc-400 mt-3">
        Curated resources to prepare for {company?.name} interviews.
      </p>

    </div>

    {/* DSA */}

    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">

      <h3 className="text-2xl font-bold mb-6">
        🚀 DSA Preparation
      </h3>

      <div className="grid md:grid-cols-2 gap-5">

        <a
          href="https://neetcode.io/roadmap"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-blue-500/20 bg-zinc-800 p-6 hover:border-blue-500 hover:-translate-y-1 transition"
        >
          <h4 className="font-semibold text-lg">
            NeetCode Roadmap
          </h4>

          <p className="text-zinc-400 mt-2">
            Complete roadmap for coding interviews.
          </p>
        </a>

        <a
          href="https://leetcode.com/problem-list/top-interview-questions/"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-yellow-500/20 bg-zinc-800 p-6 hover:border-yellow-500 hover:-translate-y-1 transition"
        >
          <h4 className="font-semibold text-lg">
            LeetCode Top Interview Questions
          </h4>

          <p className="text-zinc-400 mt-2">
            Practice the most frequently asked problems.
          </p>
        </a>

        <a
          href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-green-500/20 bg-zinc-800 p-6 hover:border-green-500 hover:-translate-y-1 transition"
        >
          <h4 className="font-semibold text-lg">
            Striver SDE Sheet
          </h4>

          <p className="text-zinc-400 mt-2">
            Popular company interview sheet.
          </p>
        </a>

        <a
          href="https://www.geeksforgeeks.org/dsa/"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-purple-500/20 bg-zinc-800 p-6 hover:border-purple-500 hover:-translate-y-1 transition"
        >
          <h4 className="font-semibold text-lg">
            GeeksforGeeks DSA
          </h4>

          <p className="text-zinc-400 mt-2">
            Learn every important DSA topic.
          </p>
        </a>

      </div>

    </div>

    {/* System Design */}

    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">

      <h3 className="text-2xl font-bold mb-6">
        🏗 System Design
      </h3>

      <div className="grid md:grid-cols-2 gap-5">

        <a
          href="https://github.com/donnemartin/system-design-primer"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-cyan-500/20 bg-zinc-800 p-6 hover:border-cyan-500 hover:-translate-y-1 transition"
        >
          <h4 className="font-semibold text-lg">
            System Design Primer
          </h4>

          <p className="text-zinc-400 mt-2">
            GitHub repository covering complete system design.
          </p>
        </a>

        <a
          href="https://bytebytego.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-orange-500/20 bg-zinc-800 p-6 hover:border-orange-500 hover:-translate-y-1 transition"
        >
          <h4 className="font-semibold text-lg">
            ByteByteGo
          </h4>

          <p className="text-zinc-400 mt-2">
            High-quality system design articles and videos.
          </p>
        </a>

      </div>

    </div>

    {/* Behavioral */}

    <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">

      <h3 className="text-2xl font-bold mb-6">
        🎯 Behavioral Interviews
      </h3>

      <div className="grid md:grid-cols-2 gap-5">

        <div className="rounded-2xl bg-zinc-800 p-6">

          <h4 className="font-semibold text-lg">
            STAR Method
          </h4>

          <p className="text-zinc-400 mt-2">
            Structure your answers using Situation, Task, Action and Result.
          </p>

        </div>

        <div className="rounded-2xl bg-zinc-800 p-6">

          <h4 className="font-semibold text-lg">
            Leadership Principles
          </h4>

          <p className="text-zinc-400 mt-2">
            Prepare leadership-based questions asked by top product companies.
          </p>

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