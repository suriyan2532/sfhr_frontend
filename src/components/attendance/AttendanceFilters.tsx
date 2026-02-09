'use client';

import { useTranslations } from 'next-intl';
import { Calendar, Search, RefreshCcw, Settings2 } from 'lucide-react';

export function AttendanceFilters() {
  const t = useTranslations('Attendance');

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Title & Icon */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Calendar className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">{t('title')}</h1>
        </div>

        {/* Right: Filters and Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5">
              <option>February</option>
              {/* Add other months */}
            </select>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5">
              <option>2026</option>
              {/* Add other years */}
            </select>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors shadow-sm">
            <Settings2 className="h-4 w-4" />
            {t('btnHolidayType')}
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors shadow-sm">
            <RefreshCcw className="h-4 w-4" />
            {t('btnRecalculate')}
          </button>

          <button className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
            <Search className="h-4 w-4" />
            {t('btnSearch')}
          </button>
        </div>
      </div>
    </div>
  );
}
