import { useState } from "react";

const getMonthsAgo = (dateString) => {
  if (!dateString) return "";

  const today = new Date();
  const date = new Date(dateString);

  const months =
    (today.getFullYear() - date.getFullYear()) * 12 +
    (today.getMonth() - date.getMonth());

  if (months <= 0) return "Asked this month";

  return `Asked ${months} month${
    months > 1 ? "s" : ""
  } ago`;
};

const QuestionAccordion = ({ question }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl mb-4 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex justify-between items-center text-left"
      >
        <div>
          <h3 className="font-semibold text-white">
            {question.question}
          </h3>

          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 text-xs rounded-full bg-blue-600">
              {question.category}
            </span>

            <span
              className={`px-2 py-1 text-xs rounded-full ${
                question.difficulty === "Easy"
                  ? "bg-green-600"
                  : question.difficulty === "Medium"
                  ? "bg-yellow-600"
                  : "bg-red-600"
              }`}
            >
              {question.difficulty}
            </span>

            {question.dateAsked && (
              <span className="px-2 py-1 text-xs rounded-full bg-zinc-700">
                {getMonthsAgo(question.dateAsked)}
              </span>
            )}
          </div>
        </div>

        <span className="text-xl text-zinc-400">
          {open ? "-" : "+"}
        </span>
      </button>

      {open && (
        <div className="border-t border-zinc-800 p-4 space-y-4">
          <div>
            <p className="text-zinc-300">
              Round: {question.round}
            </p>
          </div>

          {question.pattern && (
            <div>
              <span className="px-3 py-1 rounded-full bg-purple-600 text-sm">
                {question.pattern}
              </span>
            </div>
          )}

          <div>
            <p className="text-zinc-400">
              👍 {question.upvotes || 0} upvotes
            </p>
          </div>

          {question.thingsToKeepInMind?.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-2">
                Things to Keep in Mind
              </h4>

              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                {question.thingsToKeepInMind.map(
                  (tip, index) => (
                    <li key={index}>{tip}</li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionAccordion;