import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "../services/companyApi";
import CompanyCard from "../components/CompanyCard";

const CompanyListingPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(),
  });

  if (isLoading) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-10">
        Error loading companies
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Company Interview Prep
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data?.companies?.map((company) => (
          <CompanyCard
            key={company._id}
            company={company}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyListingPage;