import { getCompanies } from "@/lib/actions/organization-actions";
import { CompanyTable } from "@/components/organization/CompanyTable";
import { Link } from "@/navigation";
import { Plus } from "lucide-react";

export default async function OrganizationPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { companies } = await getCompanies(query, currentPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organization</h1>
          <p className="text-sm text-gray-500">
            Manage companies and subsidiaries.
          </p>
        </div>
        <Link
          href="/organization/create"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
          Add Organization
        </Link>
      </div>

      {/* Search Bar could go here */}

      {companies.length > 0 ? (
        <CompanyTable companies={companies} />
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No organizations
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new company or subsidiary.
          </p>
          <div className="mt-6">
            <Link
              href="/organization/create"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Organization
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
