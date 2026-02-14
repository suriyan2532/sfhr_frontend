import { getAllDepartmentsForSelect } from '@/lib/actions/organization-actions';
import { PositionForm } from '@/components/organization/PositionForm';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@/navigation';

export default async function CreatePositionPage() {
  const departments = await getAllDepartmentsForSelect();

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <Link
          href="/settings/master/position"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-green-600 transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Positions
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Position</h1>
        <p className="text-sm text-gray-500 mt-1">Configure a new job position within a department.</p>
      </div>

      <PositionForm departments={departments} />
    </div>
  );
}
