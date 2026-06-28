const SuccessStoryCard = ({ story }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">
          {story.role}
        </h3>

        <span className="px-3 py-1 bg-green-600 rounded-full text-sm">
          Success Story
        </span>
      </div>

      <p className="text-zinc-300 mb-4">
        {story.story}
      </p>

      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-white">
            Preparation
          </h4>

          <p className="text-zinc-400">
            {story.preparationApproach}
          </p>
        </div>

        <div>
          <h4 className="font-medium text-white">
            Key Advice
          </h4>

          <p className="text-zinc-400">
            {story.keyAdvice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;