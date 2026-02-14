import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { getDepartments, getPositions, getCompanies, getUnits, getWorkingShifts } from '@/lib/data/master-data';
import { Link } from '@/navigation';

export default async function CreateEmployeePage() {
  const departments = await getDepartments();
  const positions = await getPositions();
  const companies = await getCompanies();
  const units = await getUnits();
  const workingShifts = await getWorkingShifts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/employees"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-green-600 transition-colors mb-4"
        >
          &larr; Back to Employees
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Employee</h1>
        <div className="bg-white shadow sm:rounded-lg p-6">
          <EmployeeForm 
            departments={departments} 
            positions={positions} 
            companies={companies} 
            units={units}
            workingShifts={workingShifts}
          />
        </div>
      </div>
    </div>
  );
}
