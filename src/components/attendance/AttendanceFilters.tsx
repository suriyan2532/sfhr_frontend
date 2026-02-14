'use client';

import { useTranslations } from 'next-intl';
import { Calendar, Search, RefreshCcw, Settings2 } from 'lucide-react';

interface AttendanceFiltersProps {
  month: number;
  year: number;
  onFilterChange: (month: number, year: number) => void;
}

export function AttendanceFilters({ month, year, onFilterChange }: AttendanceFiltersProps) {
  const t = useTranslations('Attendance');

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(2000, i, 1).toLocaleString('th-TH', { month: 'long' }) // Or translate from intl
  }));

  const years = [2024, 2025, 2026];

  return (
    <div className="bg-white dark:bg-[#252525] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage and track workspace attendance</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <select 
              value={month}
              onChange={(e) => onFilterChange(Number(e.target.value), year)}
              className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-green-500 outline-none p-2.5 min-w-[140px] transition-all"
            >
              {months.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <select 
              value={year}
              onChange={(e) => onFilterChange(month, Number(e.target.value))}
              className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-xl focus:ring-2 focus:ring-green-500 outline-none p-2.5 transition-all"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 rounded-xl hover:bg-green-100 dark:hover:bg-green-500/20 transition-all border border-transparent">
              <Settings2 className="h-4 w-4" />
              {t('btnHolidayType')}
            </button>

            <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-amber-500 rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20">
              <RefreshCcw className="h-4 w-4" />
              {t('btnRecalculate')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

