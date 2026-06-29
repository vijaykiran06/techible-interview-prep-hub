import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getCompanies } from "../../services/companyApi";
import CompanyCard from "../../components/interview/CompanyCard";

const CompanyListingPage = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);
 const { data, isLoading, error } = useQuery({
  queryKey: [
    "companies",
    page,
    search,
    industry,
    difficulty,
  ],
  queryFn: () =>
    getCompanies({
      page,
      limit: 8,
      search,
      industry,
      difficulty,
    }),
});

 const companies = [...(data?.companies || [])];

companies.sort((a, b) => {
  if (sortBy === "alphabetical") {
    return a.name.localeCompare(b.name);
  }

  if (sortBy === "recent") {
    return (
      new Date(b.createdAt) -
      new Date(a.createdAt)
    );
  }

  return b.views - a.views;
});

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-red-500 flex items-center justify-center">
        Error loading companies
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-8">
        Company Interview Prep
      </h1>

      {/* Search */}
<div className="mb-10">
  <input
    type="text"
    placeholder="🔍 Search companies..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl px-6 py-5 text-lg text-white outline-none focus:border-blue-500 transition"
  />
</div>

{/* Filters */}
<div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl p-8 mb-10">

  <div className="grid lg:grid-cols-3 gap-8">

    {/* Industry */}
    <div>
      <h3 className="font-semibold text-lg mb-4">
        Industry
      </h3>

      <div className="flex flex-wrap gap-3">
        {[
          "All",
          "Tech",
          "Finance",
          "Consulting",
          "E-Commerce",
          "Healthcare",
          "EdTech",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setIndustry(item)}
            className={`px-5 py-2 rounded-full transition-all ${
              industry === item
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                : "bg-zinc-800 border border-zinc-700 hover:border-blue-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    {/* Difficulty */}
    <div>
      <h3 className="font-semibold text-lg mb-4">
        Difficulty
      </h3>

      <div className="flex flex-wrap gap-3">
        {["All", "Easy", "Medium", "Hard"].map((item) => (
          <button
            key={item}
            onClick={() => setDifficulty(item)}
            className={`px-5 py-2 rounded-full transition-all ${
              difficulty === item
                ? item === "Easy"
                  ? "bg-green-600"
                  : item === "Medium"
                  ? "bg-yellow-500 text-black"
                  : item === "Hard"
                  ? "bg-red-600"
                  : "bg-blue-600"
                : "bg-zinc-800 border border-zinc-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    {/* Sort */}
    <div>
      <h3 className="font-semibold text-lg mb-4">
        Sort By
      </h3>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 text-white focus:border-blue-500 outline-none"
      >
        <option value="popular">🔥 Most Popular</option>
        <option value="alphabetical">🔤 Alphabetical</option>
        <option value="recent">🆕 Recently Added</option>
      </select>
    </div>

  </div>

</div>

{/* Count */}
<div className="flex items-center justify-between mb-8">
  <h2 className="text-2xl font-bold">
    Explore Companies
  </h2>

  <div className="px-5 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
    {data?.pagination?.total || 0} Companies
  </div>
</div>

{/* Company Grid */}
<div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
  {companies.map((company) => (
    <CompanyCard
      key={company._id}
      company={company}
    />
  ))}
</div>
{/* Pagination */}
<div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-14">

  <button
    onClick={() => setPage((prev) => prev - 1)}
    disabled={page === 1}
    className="px-6 py-3 rounded-2xl border border-zinc-700 bg-zinc-900 hover:border-blue-500 hover:bg-zinc-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
  >
    ← Previous
  </button>

  <div className="flex items-center gap-3">

    {Array.from(
      { length: data?.pagination?.totalPages || 1 },
      (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`w-11 h-11 rounded-xl transition ${
            page === i + 1
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "bg-zinc-900 border border-zinc-700 hover:border-blue-500"
          }`}
        >
          {i + 1}
        </button>
      )
    )}

  </div>

  <button
    onClick={() => setPage((prev) => prev + 1)}
    disabled={page === data?.pagination?.totalPages}
    className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Next →
  </button>

</div>

</div>
);
};

export default CompanyListingPage;