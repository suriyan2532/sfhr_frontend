import { Plus } from "lucide-react";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { getEmployees } from "@/lib/actions/employee-actions";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { EmployeeFilters } from "@/components/employees/EmployeeFilters";
import { auth } from "@/auth";

export default async function EmployeeListPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
    companyId?: string;
    departmentId?: string;
    positionId?: string;
    shift_id?: string;
    employee_type_id?: string;
    work_type?: string;
    role_id?: string;
  }>;
}) {
  const t = await getTranslations("EmployeeForm");
  const tCommon = await getTranslations("Common");
  const params = await searchParams;
  const query = params.query || "";
  const currentPage = Number(params.page) || 1;
  const companyId = params.companyId;
  const departmentId = params.departmentId;
  const positionId = params.positionId;
  const shiftId = params.shift_id;
  const employeeTypeId = params.employee_type_id;
  const workType = params.work_type;
  const roleId = params.role_id;
  const session = await auth();
  const token = session?.user?.accessToken;

  const { employees } = await getEmployees(
    query,
    currentPage,
    companyId,
    departmentId,
    positionId,
    shiftId,
    employeeTypeId,
    workType,
    roleId,
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/employees/create"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto dark:bg-green-500 dark:hover:bg-green-600"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {tCommon("addEmployee")}
          </Link>
        </div>
      </div>

      <EmployeeFilters token={token} />

      {/* Search Bar could go here */}

      <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl shadow-xl dark:shadow-2xl overflow-hidden sm:rounded-lg border border-white/20 dark:border-white/10">
        <EmployeeTable employees={employees} />
      </div>

      {/* Pagination could go here */}
    </div>
  );
}
