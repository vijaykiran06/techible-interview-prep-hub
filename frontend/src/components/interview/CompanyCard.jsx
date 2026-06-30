import { Link } from "react-router-dom";
import {
  Building2,
  Eye,
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const CompanyCard = ({ company }) => {
  const difficultyColor = {
    Easy:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    Medium:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
    Hard:
      "bg-red-500/15 text-red-400 border border-red-500/30",
  };

  return (
    <Link
      to={`/interview-prep/${company.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.18)] block"
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />

      {/* Top Blur */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden"
          >
            {company?.logo?.url ? (
              <img
                src={company.logo.url}
                alt={company.name}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}

            <div
              className="hidden w-full h-full items-center justify-center text-white text-2xl font-bold"
              style={{
                display: company?.logo?.url ? "none" : "flex",
              }}
            >
              {company.name.charAt(0)}
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              difficultyColor[company.interviewDifficulty] ||
              "bg-zinc-800 text-zinc-300 border border-zinc-700"
            }`}
          >
            {company.interviewDifficulty}
          </div>
        </div>

        {/* Company */}
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition">
            {company.name}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-zinc-400">
            <Building2 size={16} />
            <span>{company.industry}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-zinc-800/40 border border-white/5 p-4">
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <FileText size={16} />
              Questions
            </div>

            <p className="text-white text-2xl font-bold mt-2">
              {company.questionCount || 0}
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-800/40 border border-white/5 p-4">
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Eye size={16} />
              Views
            </div>

            <p className="text-white text-2xl font-bold mt-2">
              {company.views || 0}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 group-hover:shadow-lg group-hover:shadow-blue-600/30 transition">
          <div className="flex items-center gap-2">
            <Sparkles
              size={18}
              className="text-white"
            />

            <span className="font-semibold text-white">
              Interview Guide
            </span>
          </div>

          <ArrowRight
            size={20}
            className="text-white transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;