const SuccessStoryCard = ({ story }) => {
  return (
    <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:-translate-y-1">

      {/* Top Gradient */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500"></div>

      <div className="p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <span className="text-yellow-400 text-sm font-semibold uppercase tracking-widest">
              Success Story
            </span>

            <h2 className="text-3xl font-bold mt-2">
              {story.role}
            </h2>

          </div>

          <span className="px-5 py-2 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 font-medium">
            Selected Candidate
          </span>

        </div>

        {/* Story */}

        <div className="mt-8 rounded-2xl bg-zinc-800/40 border border-white/5 p-6">

          <h3 className="text-xl font-semibold mb-4">
            Interview Experience
          </h3>

          <p className="text-zinc-300 leading-8">
            {story.story}
          </p>

        </div>

        {/* Preparation */}

        <div className="mt-8 grid lg:grid-cols-2 gap-6">

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">

            <h3 className="text-xl font-semibold text-blue-400 mb-4">
              Preparation Strategy
            </h3>

            <p className="text-zinc-300 leading-8">
              {story.preparationApproach}
            </p>

          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">

            <h3 className="text-xl font-semibold text-yellow-400 mb-4">
              Key Advice
            </h3>

            <p className="text-zinc-300 leading-8">
              {story.keyAdvice}
            </p>

          </div>

        </div>

        {/* Bottom Quote */}

        <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-800/40 p-6">

          <p className="italic text-zinc-400 text-lg leading-8">
            "Consistency, practice, and clear communication were the biggest factors in clearing the interview."
          </p>

        </div>

      </div>

    </div>
  );
};

export default SuccessStoryCard;