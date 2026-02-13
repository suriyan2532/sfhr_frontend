import { CompanyForm } from "@/components/organization/CompanyForm";
import { getAllCompaniesForSelect } from "@/lib/actions/organization-actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Link } from "@/navigation";

export default async function EditCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  // Fetch company
  const company = await prisma.company.findUnique({
    where: { id, isDeleted: false },
  });

  if (!company) {
    notFound();
  }

  // Fetch potential parents (exclude itself to avoid cycles, though circular logic check is better done in action)
  // For simple UI, just fetch all. Action should prevent setting self as parent.
  const allCompanies = await getAllCompaniesForSelect();
  const parentOptions = allCompanies.filter((c) => c.id !== id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <Link
            href="/organization"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Back to Organization
          </Link>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Dashboard
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="shrink-0 h-5 w-5 text-gray-300">/</span>
                <Link
                  href="/organization"
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Organization
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="shrink-0 h-5 w-5 text-gray-300">/</span>
                <span
                  className="ml-4 text-sm font-medium text-gray-500"
                  aria-current="page"
                >
                  Edit
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <CompanyForm company={company} parentOptions={parentOptions} />
    </div>
  );
}
