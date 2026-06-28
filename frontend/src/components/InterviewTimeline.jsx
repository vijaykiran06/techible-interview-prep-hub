const InterviewTimeline = ({ process }) => {
  if (!process?.phases?.length) {
    return (
      <div className="text-zinc-400">
        No interview process available.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {process.phases.map((phase) => (
        <div
          key={phase._id}
          className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
              Round {phase.order}
            </span>

            <h3 className="text-xl font-bold">
              {phase.name}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-zinc-400">
                Duration:
              </span>{" "}
              {phase.duration}
            </div>

            <div>
              <span className="text-zinc-400">
                Format:
              </span>{" "}
              {phase.format}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">
              What It Tests
            </h4>

            <p className="text-zinc-300">
              {phase.whatItTests}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">
              What To Expect
            </h4>

            <ul className="list-disc ml-6 text-zinc-300">
              {phase.whatToExpect?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">
              Platforms
            </h4>

            <div className="flex flex-wrap gap-2">
              {phase.platforms?.map((platform, index) => (
                <span
                  key={index}
                  className="bg-zinc-800 px-3 py-1 rounded-full text-sm"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewTimeline;