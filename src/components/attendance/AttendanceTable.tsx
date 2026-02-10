'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { clsx } from 'clsx';
import { Eye } from 'lucide-react';
import { endOfMonth } from 'date-fns';

interface DayData {
  day: number;
  date: string;
  status?: string | null;
  leaveType?: string | null;
  timeIn?: string | null;
  timeOut?: string | null;
}

interface AttendanceRecord {
  id: string;
  employeeCode: string;
  name: string;
  department: string;
  days: DayData[];
  totalDays: number;
}

interface AttendanceTableProps {
  records: AttendanceRecord[];
  month: number;
  year: number;
}

export function AttendanceTable({ records, month, year }: AttendanceTableProps) {
  const t = useTranslations('Attendance');
  const locale = useLocale();
  
  const startDate = new Date(year, month - 1, 1);
  const daysInMonthCount = endOfMonth(startDate).getDate();

  const weekdaysHeader = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdaysThai = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  const getWeekday = (day: number) => {
      const idx = new Date(year, month - 1, day).getDay();
      return locale === 'th' ? weekdaysThai[idx] : weekdaysHeader[idx];
  };

  return (
    <div className="bg-white dark:bg-[#252525] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-white/5">
              <th className="p-3 font-semibold sticky left-0 bg-gray-50 dark:bg-[#252525] z-20 min-w-[200px] border-r border-gray-200 dark:border-white/10">
                {t('colEmployee')}
              </th>
              {Array.from({ length: daysInMonthCount }, (_, i) => {
                const isWeekend = new Date(year, month - 1, i + 1).getDay() === 0 || new Date(year, month - 1, i + 1).getDay() === 6;
                return (
                  <th key={i} className={clsx(
                    "p-1 text-center font-bold border-r border-gray-200 dark:border-white/10 min-w-[45px]",
                    isWeekend && "bg-gray-200/50 dark:bg-white/10 text-gray-900 dark:text-white"
                  )}>
                    <div>{getWeekday(i + 1)}</div>
                    <div className="text-sm">{i + 1}</div>
                  </th>
                );
              })}
              <th className="p-3 font-semibold text-center border-r border-gray-200 dark:border-white/10">{t('colTotal')}</th>
              <th className="p-3 font-semibold text-center sticky right-0 bg-gray-50 dark:bg-[#252525] z-20 border-l border-gray-200 dark:border-white/10">{t('colAction')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="p-3 sticky left-0 bg-white dark:bg-[#252525] z-10 border-r border-gray-200 dark:border-white/10">
                  <div className="font-bold text-gray-900 dark:text-white">{record.employeeCode} , {record.name}</div>
                  <div className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-medium">
                     {record.department}
                  </div>
                </td>
                
                {record.days.map((day, idx) => {
                  const isWeekend = new Date(year, month - 1, idx + 1).getDay() === 0 || new Date(year, month - 1, idx + 1).getDay() === 6;
                  
                  return (
                    <td key={idx} className={clsx(
                      "p-1 text-center border-r border-gray-100 dark:border-white/5 align-middle min-h-[60px]",
                      isWeekend && "bg-gray-50/50 dark:bg-white/[0.02]"
                    )}>
                      {day.status === 'PRESENT' && (
                        <div className="mx-auto w-8 h-8 flex items-center justify-center border-2 border-emerald-400 dark:border-emerald-500/50 rounded-md text-emerald-500 font-bold bg-white dark:bg-emerald-500/10 text-[10px]">
                          P
                        </div>
                      )}
                      {day.status === 'LEAVE' && (
                        <div className="mx-auto w-8 h-8 flex items-center justify-center bg-gray-600 dark:bg-gray-500 rounded-md text-white font-bold text-[10px]">
                          {day.leaveType || 'L'}
                        </div>
                      )}
                      
                      {(day.timeIn || day.timeOut) && (
                        <div className="text-[9px] mt-1 text-indigo-600 dark:text-indigo-400 font-bold leading-tight">
                          {day.timeIn} <br/> {day.timeOut}
                        </div>
                      )}
                      
                      {day.status === 'ABSENT' && !isWeekend && (
                         <div className="mx-auto w-8 h-8 flex items-center justify-center border-2 border-rose-400 dark:border-rose-500/50 rounded-md text-rose-500 font-bold bg-white dark:bg-rose-500/10 text-[10px]">
                            A
                         </div>
                      )}
                    </td>
                  )
                })}

                <td className="p-3 text-center font-bold text-gray-900 dark:text-white border-r border-gray-200 dark:border-white/10 whitespace-nowrap">
                  {record.totalDays}
                </td>
                
                <td className="p-3 sticky right-0 bg-white dark:bg-[#252525] z-10 border-l border-gray-200 dark:border-white/10">
                  <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded hover:bg-emerald-100 transition-colors">
                    {t('viewDetail')}
                    <Eye className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

