import { Plus } from "lucide-react";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { getEmployees } from "@/lib/actions/employee-actions";
import { Link } from "@/navigation";

export default async function EmployeeListPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || "";
  const currentPage = Number(params.page) || 1;

  const { employees, totalPages } = await getEmployees(query, currentPage);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Employees
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            A list of all employees including their name, title, department, and
            role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/employees/create"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto dark:bg-amber-500 dark:hover:bg-amber-600"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Employee
          </Link>
        </div>
      </div>

      {/* Search Bar could go here */}

      <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl shadow-xl dark:shadow-2xl overflow-hidden sm:rounded-lg border border-white/20 dark:border-white/10">
        <EmployeeTable employees={employees} />
      </div>

      {/* Pagination could go here */}
    </div>
  );
}
