import { createEmployee } from '@/lib/actions/employee-actions';
import { Department, Position, Company, WorkingShift, Unit } from '@prisma/client';
import { Link } from '@/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema, EmployeeFormValues } from '@/lib/validators/employee-schema';

interface EmployeeFormProps {
  departments: Department[];
  positions: Position[];
  companies: Company[];
  units: Unit[];
  workingShifts: WorkingShift[];
}

export function EmployeeForm({ departments, positions, companies, units, workingShifts }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      status: 'PROBATION',
      positionIds: [],
    },
  });

  const onSubmit = async (data: EmployeeFormValues) => {
    const formData = new FormData();
    // Append all fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
          value.forEach(v => formData.append(key, v));
      } else if (value !== null && value !== undefined) {
          formData.append(key, value instanceof Date ? value.toISOString() : value.toString());
      }
    });

    const result = await createEmployee(formData);
    
    if (result?.errors) {
        // Handle field errors from server
        Object.entries(result.errors).forEach(([key, messages]) => {
            setError(key as any, { message: messages[0] });
        });
    } else if (result?.message) {
        // General error
        alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        
        {/* Basic Information */}
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Basic Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Identity and contact details.
            </p>
          </div>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="idCard" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                ID Card (National ID) *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register('idCard')}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                {errors.idCard && <p className="mt-2 text-sm text-red-600">{errors.idCard.message}</p>}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Employee ID *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register('employeeId')}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                {errors.employeeId && <p className="mt-2 text-sm text-red-600">{errors.employeeId.message}</p>}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                First Name *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register('firstName')}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Last Name *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  {...register('lastName')}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>}
              </div>
            </div>
            
             <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Company *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                 <select
                   title="Company"
                   {...register('companyId')}
                   className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                 >
                   <option value="">Select a Company</option>
                   {companies.map(c => (
                     <option key={c.id} value={c.id}>{c.name}</option>
                   ))}
                 </select>
                 {errors.companyId && <p className="mt-2 text-sm text-red-600">{errors.companyId.message}</p>}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="unitId" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Unit
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                 <select
                   title="Unit"
                   {...register('unitId')}
                   className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                 >
                   <option value="">Select a Unit (Optional)</option>
                   {units.map(u => (
                     <option key={u.id} value={u.id}>{u.name}</option>
                   ))}
                 </select>
                 {errors.unitId && <p className="mt-2 text-sm text-red-600">{errors.unitId.message}</p>}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Department *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                 <select
                   title="Department"
                   {...register('departmentId')}
                   className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                 >
                   <option value="">Select a Department</option>
                   {departments.map(d => (
                     <option key={d.id} value={d.id}>{d.name}</option>
                   ))}
                 </select>
                 {errors.departmentId && <p className="mt-2 text-sm text-red-600">{errors.departmentId.message}</p>}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="positionIds" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Positions *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                 <select
                    title="Positions"
                    multiple
                   {...register('positionIds')}
                   className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md h-32"
                 >
                   {positions.map(p => (
                     <option key={p.id} value={p.id}>{p.title}</option>
                   ))}
                 </select>
                 <p className="mt-2 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple positions.</p>
                 {errors.positionIds && <p className="mt-2 text-sm text-red-600">{errors.positionIds.message}</p>}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="workingShiftId" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Working Shift
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                 <select
                   title="Working Shift"
                   {...register('workingShiftId')}
                   className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                 >
                   <option value="">Select a Shift (Optional)</option>
                   {workingShifts.map(s => (
                     <option key={s.id} value={s.id}>{s.name} ({s.startTime} - {s.endTime})</option>
                   ))}
                 </select>
                 {errors.workingShiftId && <p className="mt-2 text-sm text-red-600">{errors.workingShiftId.message}</p>}
              </div>
            </div>
            
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Join Date *
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="date"
                  {...register('joinDate')}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
                {errors.joinDate && <p className="mt-2 text-sm text-red-600">{errors.joinDate.message}</p>}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Link
            href="/dashboard/employees"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
}
