import { 
    getAllCompaniesForSelect, 
    getAllUnitsForSelect, 
    getAllDepartmentsForSelect 
} from '@/lib/actions/organization-actions';
import { DepartmentForm } from '@/components/organization/DepartmentForm';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@/navigation';

export default async function CreateDepartmentPage() {
  const [companies, units, parents] = await Promise.all([
    getAllCompaniesForSelect(),
    getAllUnitsForSelect(),
    getAllDepartmentsForSelect()
  ]);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <Link
          href="/settings/master/department"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-green-600 transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Departments
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Department</h1>
        <p className="text-sm text-gray-500 mt-1">Configure a new department within a company or unit.</p>
      </div>

      <DepartmentForm companies={companies} units={units} parents={parents} />
    </div>
  );
}
