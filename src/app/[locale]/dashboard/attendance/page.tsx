import { AttendanceFilters } from '@/components/attendance/AttendanceFilters';
import { AttendanceTable } from '@/components/attendance/AttendanceTable';

export default function AttendancePage() {
  return (
    <div className="flex flex-col h-full bg-gray-50 p-4 sm:p-6 lg:p-8 space-y-6">
      <AttendanceFilters />
      <AttendanceTable />
    </div>
  );
}
