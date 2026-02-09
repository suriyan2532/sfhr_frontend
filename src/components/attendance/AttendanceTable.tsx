'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { clsx } from 'clsx';
import { Eye } from 'lucide-react';

interface DayData {
  day: number;
  weekday: string;
  status?: 'N' | 'PH' | 'V' | 'Off';
  timeIn?: string;
  timeOut?: string;
}

interface AttendanceRecord {
  id: string;
  employeeCode: string;
  name: string;
  department: string;
  days: DayData[];
  totalDays: string;
}

export function AttendanceTable() {
  const t = useTranslations('Attendance');
  const locale = useLocale();
  
  // Dummy data for visualization
  const records: AttendanceRecord[] = [
    {
      id: '1',
      employeeCode: '5137',
      name: 'Kencho Ossnajorn',
      department: 'Computer',
      totalDays: '3.5 Days',
      days: Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(2026, 1, i + 1).getDay()],
        status: i === 0 ? 'N' : (i === 1 || i === 2 || i === 3 ? 'PH' : (i === 4 ? 'N' : undefined)),
        timeIn: i === 4 ? '08:33' : undefined,
        timeOut: i === 4 ? '17:04' : undefined,
      }))
    },
    {
      id: '2',
      employeeCode: '5260',
      name: 'Kriengkrai Chommontha',
      department: 'Computer',
      totalDays: '5 Days',
      days: Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(2026, 1, i + 1).getDay()],
        status: i === 0 ? 'PH' : (i === 1 ? 'N' : (i === 2 ? 'N' : undefined)),
        timeIn: i === 2 ? '08:37' : undefined,
        timeOut: i === 2 ? '17:04' : undefined,
      }))
    }
  ];

  const weekdaysHeader = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdaysThai = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  const getWeekday = (day: number) => {
      const idx = new Date(2026, 1, day).getDay();
      return locale === 'th' ? weekdaysThai[idx] : weekdaysHeader[idx];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <th className="p-3 font-semibold sticky left-0 bg-gray-50 z-20 min-w-[200px] border-r border-gray-200">
                {t('colEmployee')}
              </th>
              {Array.from({ length: 31 }, (_, i) => {
                const isWeekend = new Date(2026, 1, i + 1).getDay() === 0 || new Date(2026, 1, i + 1).getDay() === 6;
                return (
                  <th key={i} className={clsx(
                    "p-1 text-center font-bold border-r border-gray-200 min-w-[45px]",
                    isWeekend && "bg-gray-200 text-gray-900"
                  )}>
                    <div>{getWeekday(i + 1)}</div>
                    <div className="text-sm">{i + 1}</div>
                  </th>
                );
              })}
              <th className="p-3 font-semibold text-center border-r border-gray-200">{t('colTotal')}</th>
              <th className="p-3 font-semibold text-center sticky right-0 bg-gray-50 z-20 border-l border-gray-200">{t('colAction')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 sticky left-0 bg-white z-10 border-r border-gray-200">
                  <div className="font-bold text-gray-900">{record.employeeCode} , {record.name}</div>
                  <div className="text-emerald-600 flex items-center gap-1 mt-1">
                    <span className="text-lg">⚙️</span> {record.department}
                  </div>
                </td>
                
                {record.days.map((day, idx) => {
                  const isWeekend = new Date(2026, 1, idx + 1).getDay() === 0 || new Date(2026, 1, idx + 1).getDay() === 6;
                  
                  return (
                    <td key={idx} className={clsx(
                      "p-1 text-center border-r border-gray-100 align-middle min-h-[60px]",
                      isWeekend && "bg-gray-50/50"
                    )}>
                      {day.status === 'N' && (
                        <div className="mx-auto w-8 h-8 flex items-center justify-center border-2 border-red-400 rounded-md text-red-500 font-bold bg-white text-[10px]">
                          N
                        </div>
                      )}
                      {day.status === 'PH' && (
                        <div className="mx-auto w-8 h-8 flex items-center justify-center bg-gray-600 rounded-md text-white font-bold text-[10px]">
                          PH
                        </div>
                      )}
                      {day.status === 'V' && (
                        <div className="mx-auto w-8 h-8 flex items-center justify-center bg-emerald-600 rounded-md text-white font-bold text-[10px]">
                          V
                        </div>
                      )}
                      
                      {day.timeIn && (
                        <div className="text-[9px] mt-1 text-red-500 font-medium leading-tight">
                          {day.timeIn} <br/> {day.timeOut}
                        </div>
                      )}
                    </td>
                  )
                })}

                <td className="p-3 text-center font-medium text-gray-900 border-r border-gray-200 whitespace-nowrap">
                  {record.totalDays}
                </td>
                
                <td className="p-3 sticky right-0 bg-white z-10 border-l border-gray-200">
                  <button className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded hover:bg-emerald-100 transition-colors">
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
