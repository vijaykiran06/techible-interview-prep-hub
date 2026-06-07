import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getCompanies } from "../services/companyApi";
import CompanyCard from "../components/CompanyCard";

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
      <div className="max-w-3xl mb-8">
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
        />
      </div>

      {/* Industry Filter */}
      <div className="mb-6">
        <h3 className="text-zinc-400 mb-3">
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
              onClick={() =>
                setIndustry(item)
              }
              className={`px-4 py-2 rounded-full border transition ${
                industry === item
                  ? "bg-blue-600 border-blue-600"
                  : "border-zinc-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h3 className="text-zinc-400 mb-3">
          Difficulty
        </h3>

        <div className="flex flex-wrap gap-3">
          {[
            "All",
            "Easy",
            "Medium",
            "Hard",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setDifficulty(item)
              }
              className={`px-4 py-2 rounded-full border transition ${
                difficulty === item
                  ? "bg-green-600 border-green-600"
                  : "border-zinc-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="mb-8">
        <h3 className="text-zinc-400 mb-3">
          Sort By
        </h3>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white"
        >
          <option value="popular">
            Most Popular
          </option>

          <option value="alphabetical">
            Alphabetical
          </option>

          <option value="recent">
            Recently Added
          </option>
        </select>
      </div>

      {/* Company Count */}
      <p className="mb-6 text-zinc-400">
       Showing {data?.pagination?.total || 0} companies
      </p>

      {/* Company Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {companies.map((company) => (
          <CompanyCard
            key={company._id}
            company={company}
          />
        ))}
      </div>

{/* Pagination */}
<div className="flex justify-center items-center gap-4 mt-10">

  <button
    onClick={() => setPage((prev) => prev - 1)}
    disabled={page === 1}
    className="px-4 py-2 rounded-lg bg-zinc-800 disabled:opacity-50"
  >
    Previous
  </button>

  <span className="text-zinc-300">
    Page {page} of {data?.pagination?.totalPages || 1}
  </span>

  <button
    onClick={() => setPage((prev) => prev + 1)}
    disabled={
      page === data?.pagination?.totalPages
    }
    className="px-4 py-2 rounded-lg bg-zinc-800 disabled:opacity-50"
  >
    Next
  </button>

</div>
    </div>

    
  );
};

export default CompanyListingPage;