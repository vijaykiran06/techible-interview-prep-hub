const InterviewTimeline = ({ process }) => {
  if (!process?.phases?.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-zinc-900 p-10 text-center text-zinc-400">
        No interview process available.
      </div>
    );
  }

  return (
    <div className="relative">

      {/* Vertical Line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent"></div>

      <div className="space-y-10">

        {process.phases.map((phase) => (
          <div
            key={phase._id}
            className="relative pl-16"
          >

            {/* Timeline Dot */}
            <div className="absolute left-0 top-8 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center font-bold shadow-lg shadow-blue-600/40">
              {phase.order}
            </div>

            {/* Card */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-8 hover:border-blue-500 transition-all duration-300">

              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                <div>

                  <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
                    Interview Round {phase.order}
                  </span>

                  <h2 className="text-3xl font-bold mt-2">
                    {phase.name}
                  </h2>

                </div>

                <div className="flex flex-wrap gap-3">

                  <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    {phase.duration}
                  </span>

                  <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    {phase.format}
                  </span>

                </div>

              </div>

              {/* What it Tests */}

              <div className="mt-8 rounded-2xl bg-zinc-800/40 border border-white/5 p-6">

                <h3 className="text-xl font-semibold mb-3">
                  What It Tests
                </h3>

                <p className="text-zinc-300 leading-8">
                  {phase.whatItTests}
                </p>

              </div>

              {/* Expectations */}

              {phase.whatToExpect?.length > 0 && (

                <div className="mt-8">

                  <h3 className="text-xl font-semibold mb-5">
                    What To Expect
                  </h3>

                  <div className="space-y-4">

                    {phase.whatToExpect.map((item, index) => (

                      <div
                        key={index}
                        className="flex gap-4 rounded-2xl border border-blue-500/15 bg-blue-500/5 p-4"
                      >

                        <div className="text-blue-400 font-bold">
                          ✓
                        </div>

                        <p className="text-zinc-300">
                          {item}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

              )}

              {/* Platforms */}

              {phase.platforms?.length > 0 && (

                <div className="mt-8">

                  <h3 className="text-xl font-semibold mb-5">
                    Platforms
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {phase.platforms.map(
                      (platform, index) => (

                        <span
                          key={index}
                          className="px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-blue-500 transition"
                        >
                          {platform}
                        </span>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default InterviewTimeline;