import { CompanyForm } from '@/components/organization/CompanyForm';
import { getAllCompaniesForSelect } from '@/lib/actions/organization-actions';

export default async function CreateCompanyPage() {
    const companies = await getAllCompaniesForSelect();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
        <div>
            <nav className="sm:hidden" aria-label="Back">
                <a href="/dashboard/organization" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                    {/* Chevron Left */}
                    Back to Organization
                </a>
            </nav>
            <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                    <li>
                        <div className="flex">
                            <a href="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-700">Dashboard</a>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <span className="flex-shrink-0 h-5 w-5 text-gray-300">/</span>
                            <a href="/dashboard/organization" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Organization</a>
                        </div>
                    </li>
                    <li>
                         <div className="flex items-center">
                            <span className="flex-shrink-0 h-5 w-5 text-gray-300">/</span>
                            <span className="ml-4 text-sm font-medium text-gray-500" aria-current="page">Create</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>

      <CompanyForm parentOptions={companies} />
    </div>
  );
}
