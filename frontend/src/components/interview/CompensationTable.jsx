const CompensationTable = ({ compensation }) => {
  if (!compensation?.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-zinc-900 p-10 text-center text-zinc-400">
        No compensation data available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-zinc-900">

      <table className="w-full">

        <thead className="bg-gradient-to-r from-zinc-800 to-zinc-900 border-b border-white/10">

          <tr>

            <th className="px-6 py-5 text-left text-zinc-400 font-semibold uppercase tracking-wider">
              Role
            </th>

            <th className="px-6 py-5 text-left text-zinc-400 font-semibold uppercase tracking-wider">
              Level
            </th>

            <th className="px-6 py-5 text-left text-zinc-400 font-semibold uppercase tracking-wider">
              Salary
            </th>

            <th className="px-6 py-5 text-left text-zinc-400 font-semibold uppercase tracking-wider">
              Location
            </th>

            <th className="px-6 py-5 text-left text-zinc-400 font-semibold uppercase tracking-wider">
              Year
            </th>

          </tr>

        </thead>

        <tbody>

          {compensation.map((item, index) => (

            <tr
              key={item._id}
              className={`transition-all hover:bg-zinc-800/40 ${
                index !== compensation.length - 1
                  ? "border-b border-white/5"
                  : ""
              }`}
            >

              <td className="px-6 py-6">

                <div>

                  <h3 className="font-semibold text-white">
                    {item.role}
                  </h3>

                </div>

              </td>

              <td className="px-6 py-6">

                <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                  {item.level}
                </span>

              </td>

              <td className="px-6 py-6">

                <span className="text-green-400 font-bold text-lg">
                  ₹
                  {(item.minSalary / 100000).toFixed(1)}
                  L
                  {" - "}
                  {(item.maxSalary / 100000).toFixed(1)}
                  L
                </span>

              </td>

              <td className="px-6 py-6 text-zinc-300">
                {item.location}
              </td>

              <td className="px-6 py-6">

                <span className="px-3 py-2 rounded-full bg-zinc-800 text-zinc-300 text-sm">
                  {item.yearReported}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default CompensationTable;