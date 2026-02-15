import { Employee } from "@/lib/api/types";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "@/navigation";
import { deleteEmployee } from "@/lib/actions/employee-actions";
import { getTranslations } from "next-intl/server";

interface EmployeeTableProps {
  employees: Employee[];
}

export async function EmployeeTable({ employees }: EmployeeTableProps) {
  const t = await getTranslations("EmployeeTable");

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-zinc-900/50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              {t("headers.name")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              {t("headers.idPosition")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              {t("headers.department")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell"
            >
              {t("headers.employeeType")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell"
            >
              {t("headers.shift")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell"
            >
              {t("headers.role")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell"
            >
              {t("headers.contract")}
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              {t("headers.status")}
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">{t("headers.actions")}</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-zinc-800/50 divide-y divide-gray-200 dark:divide-gray-700">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400 font-bold">
                      {employee.firstName[0]}
                      {employee.lastName[0]}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {employee.firstName} {employee.lastName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {employee.employeeId}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {employee.positions && employee.positions.length > 0
                    ? employee.positions.map((p) => p.title).join(", ")
                    : "-"}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {employee.employeeId}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                  {employee.department?.name || "-"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell text-sm text-gray-500 dark:text-gray-400">
                {employee.employeeType?.name || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell text-sm text-gray-500 dark:text-gray-400">
                {employee.shift?.name || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden xl:table-cell text-sm text-gray-500 dark:text-gray-400">
                {employee.user?.role || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden xl:table-cell text-sm text-gray-500 dark:text-gray-400">
                {employee.workType || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {employee.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/employees/${employee.id}`}
                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteEmployee(employee.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
