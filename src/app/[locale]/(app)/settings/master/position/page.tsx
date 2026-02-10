import { getPositions } from '@/lib/actions/organization-actions';
import { PositionTable } from '@/components/organization/PositionTable';
import { Link } from '@/navigation';
import { Plus, Briefcase } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function PositionListPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const t = await getTranslations('MasterData');

  const { positions, totalCount } = await getPositions(query, currentPage);

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
                <Briefcase className="h-6 w-6" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('categories.position')}</h1>
                <p className="text-sm text-gray-500">Manage job positions and grading structures.</p>
            </div>
        </div>
        <Link
          href="/settings/master/position/create"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-all focus:ring-4 focus:ring-indigo-100"
        >
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          Add Position
        </Link>
      </div>

      {positions.length > 0 ? (
        <PositionTable positions={positions} />
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">No positions found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new position.</p>
            <div className="mt-6">
                <Link
                href="/settings/master/position/create"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-sm"
                >
                <Plus className="-ml-1 mr-2 h-4 w-4" />
                Add Position
                </Link>
            </div>
        </div>
      )}
    </div>
  );
}
