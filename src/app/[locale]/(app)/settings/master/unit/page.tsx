import { getUnits } from "@/lib/actions/organization-actions";
import { UnitTable } from "@/components/organization/UnitTable";
import { Link } from "@/navigation";
import { Plus, LayoutGrid } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function UnitListPage() {
  // const resolvedSearchParams = await searchParams;
  // const query = resolvedSearchParams?.query || "";
  // const currentPage = Number(resolvedSearchParams?.page) || 1;
  const t = await getTranslations("MasterData");

  const units = await getUnits();

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
            <LayoutGrid className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t("categories.unit")}
            </h1>
            <p className="text-sm text-gray-500">
              Manage organizational units and agencies.
            </p>
          </div>
        </div>
        <Link
          href="/settings/master/unit/create"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          Add Unit
        </Link>
      </div>

      {units.length > 0 ? (
        <UnitTable units={units} />
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <LayoutGrid className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900">
            No units found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new unit.
          </p>
          <div className="mt-6">
            <Link
              href="/settings/master/unit/create"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-sm"
            >
              <Plus className="-ml-1 mr-2 h-4 w-4" />
              Add Unit
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
