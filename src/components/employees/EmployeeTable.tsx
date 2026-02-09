import { Employee, Department, Position, Person, EmployeePosition } from '@prisma/client';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { Link } from '@/navigation';
import { deleteEmployee } from '@/lib/actions/employee-actions';

// Extended type to include relations
type EmployeeWithRelations = Employee & {
  person: Person;
  department: Department;
  positions: (EmployeePosition & { position: Position })[];
};

interface EmployeeTableProps {
  employees: EmployeeWithRelations[];
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID / Position
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                      {employee.person.firstName[0]}{employee.person.lastName[0]}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.person.firstName} {employee.person.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{employee.employeeId}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                    {employee.positions.map(p => p.position.title).join(', ')}
                </div>
                <div className="text-sm text-gray-500">{employee.employeeId}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {employee.department.name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/employees/${employee.id}`} className="text-indigo-600 hover:text-indigo-900">
                        <Pencil className="h-4 w-4" />
                    </Link>
                    <form action={async () => {
                        'use server';
                        await deleteEmployee(employee.id);
                    }}>
                        <button type="submit" className="text-red-600 hover:text-red-900">
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
