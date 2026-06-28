import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300">

      {/* Company Logo */}
      {company?.logo?.url ? (
  <img
  
    src={company.logo.url}
    alt={company.name}
    className="w-16 h-16 mx-auto rounded-full bg-white object-contain"
    onError={(e) => {
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'flex';
    }}
  />
) : null}

<div
  className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-zinc-800 text-2xl font-bold text-white"
  style={{ display: company?.logo?.url ? 'none' : 'flex' }}
>
  {company.name.charAt(0)}
</div>

      {/* Company Name */}
      <h3 className="mt-4 text-xl font-semibold text-white text-center">
        {company.name}
      </h3>
    
      {/* Industry */}
      <p className="text-zinc-400 text-center">
        {company.industry}
      </p>
    
      {/* Badges */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
     
         <span
          className={`px-3 py-1 text-sm rounded-full ${
            company.interviewDifficulty === "Easy"
              ? "bg-green-100 text-green-700"
              : company.interviewDifficulty === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {company.interviewDifficulty}
        </span>

        <span className="px-3 py-1 text-sm rounded-full bg-zinc-800 text-zinc-300">
          {company.industry}
        </span>

      </div>


      {/* Question Count */}
      <div className="flex justify-center gap-6 mt-4 text-zinc-400 text-sm">

  <div>
    📝 {company.questionCount || 0}
  </div>

  <div>
    👁 {company.views}
  </div>

</div>
      {/* Button */}
      <Link
        to={`/interview-prep/${company.slug}`}
        className="block mt-6 text-center bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl transition"
      >
        View Interview Guide
      </Link>

    </div>
  );
};

export default CompanyCard;