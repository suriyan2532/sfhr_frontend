import { getAllCompaniesForSelect } from '@/lib/actions/organization-actions';
import { CompanyForm } from '@/components/organization/CompanyForm';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@/navigation';

export default async function CreateCompanyMasterPage() {
  const companies = await getAllCompaniesForSelect();

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <Link
          href="/settings/master/company"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Companies
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Company</h1>
        <p className="text-sm text-gray-500 mt-1">Configure a new company or subsidiary.</p>
      </div>

      <CompanyForm parentOptions={companies} />
    </div>
  );
}
