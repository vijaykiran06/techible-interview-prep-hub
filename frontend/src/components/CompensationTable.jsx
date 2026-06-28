const CompensationTable = ({ compensation }) => {
  if (!compensation?.length) {
    return (
      <div className="text-zinc-400">
        No compensation data available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-zinc-900 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-zinc-800">
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Level</th>
            <th className="p-4 text-left">Salary Range</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Year</th>
          </tr>
        </thead>

        <tbody>
          {compensation.map((item) => (
            <tr
              key={item._id}
              className="border-t border-zinc-800"
            >
              <td className="p-4">{item.role}</td>

              <td className="p-4">
                {item.level}
              </td>

              <td className="p-4 text-green-500 font-semibold">
                ₹
                {(item.minSalary / 100000).toFixed(1)}
                L
                -
                {(item.maxSalary / 100000).toFixed(1)}
                L
              </td>

              <td className="p-4">
                {item.location}
              </td>

              <td className="p-4">
                {item.yearReported}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompensationTable;