import { Plus } from 'lucide-react';
import { EmployeeTable } from '@/components/employees/EmployeeTable';
import { getEmployees } from '@/lib/actions/employee-actions';
import { Link } from '@/navigation';

export default async function EmployeeListPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || '';
  const currentPage = Number(params.page) || 1;

  const { employees, totalPages } = await getEmployees(query, currentPage);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all employees including their name, title, department, and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/employees/create"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Employee
          </Link>
        </div>
      </div>

      {/* Search Bar could go here */}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <EmployeeTable employees={employees} />
      </div>
      
      {/* Pagination could go here */}
    </div>
  );
}
