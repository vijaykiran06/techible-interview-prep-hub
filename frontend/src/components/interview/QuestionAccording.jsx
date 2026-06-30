import { useState } from "react";

const getMonthsAgo = (dateString) => {
  if (!dateString) return "";

  const today = new Date();
  const date = new Date(dateString);

  const months =
    (today.getFullYear() - date.getFullYear()) * 12 +
    (today.getMonth() - date.getMonth());

  if (months <= 0) return "Asked this month";

  return `Asked ${months} month${months > 1 ? "s" : ""} ago`;
};

const QuestionAccordion = ({ question }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group rounded-3xl border transition-all duration-300 overflow-hidden ${
        open
          ? "border-blue-500 bg-gradient-to-br from-zinc-900 via-zinc-900 to-blue-950/20"
          : "border-white/10 bg-zinc-900 hover:border-blue-500/60"
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left"
      >
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-semibold text-white leading-8">
              {question.question}
            </h3>

            <div className="flex flex-wrap gap-3 mt-5">
              <span className="px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-sm">
                {question.category}
              </span>

              <span
                className={`px-4 py-2 rounded-full text-sm border ${
                  question.difficulty === "Easy"
                    ? "bg-green-500/15 text-green-400 border-green-500/30"
                    : question.difficulty === "Medium"
                    ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                    : "bg-red-500/15 text-red-400 border-red-500/30"
                }`}
              >
                {question.difficulty}
              </span>

              {question.dateAsked && (
                <span className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-sm">
                  {getMonthsAgo(question.dateAsked)}
                </span>
              )}
            </div>
          </div>

          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${
              open
                ? "bg-blue-600 text-white rotate-180"
                : "bg-zinc-800 text-zinc-400 group-hover:bg-blue-600 group-hover:text-white"
            }`}
          >
            {open ? "−" : "+"}
          </div>
        </div>
      </button>

      {/* Content */}
      <div
        className={`grid transition-all duration-500 ${
          open
            ? "grid-rows-[1fr]"
            : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 p-6 space-y-8">

            {/* Round & Pattern */}
            <div className="grid md:grid-cols-2 gap-6">

              <div className="rounded-2xl bg-zinc-800/40 border border-white/5 p-5">
                <p className="text-zinc-500 text-sm">
                  Interview Round
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {question.round || "Not Available"}
                </h3>
              </div>

              <div className="rounded-2xl bg-zinc-800/40 border border-white/5 p-5">
                <p className="text-zinc-500 text-sm">
                  Pattern
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {question.pattern || "General"}
                </h3>
              </div>

            </div>

            {/* Upvotes */}
            <div className="rounded-2xl bg-zinc-800/40 border border-white/5 p-5">

              <p className="text-zinc-500 text-sm">
                Community Rating
              </p>

              <h3 className="text-3xl font-bold text-blue-400 mt-2">
                {question.upvotes || 0}
              </h3>

              <p className="text-zinc-400 mt-1">
                Helpful Votes
              </p>

            </div>

            {/* Tips */}
            {question.thingsToKeepInMind?.length > 0 && (
              <div>

                <h3 className="text-xl font-semibold mb-5">
                  Things to Keep in Mind
                </h3>

                <div className="space-y-4">

                  {question.thingsToKeepInMind.map(
                    (tip, index) => (
                      <div
                        key={index}
                        className="flex gap-4 rounded-2xl border border-green-500/20 bg-green-500/5 p-4"
                      >
                        <div className="text-green-400 font-bold">
                          ✓
                        </div>

                        <p className="text-zinc-300">
                          {tip}
                        </p>
                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAccordion;