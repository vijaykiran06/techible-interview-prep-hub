const EmptyState = ({ message }) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-8 text-center">
      <p className="text-zinc-400">{message}</p>
    </div>
  );
};

export default EmptyState;