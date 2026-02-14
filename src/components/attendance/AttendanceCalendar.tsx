'use client';

import { useTranslations, useLocale } from 'next-intl';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { th, enUS } from 'date-fns/locale';
import { clsx } from 'clsx';
import { Clock, Coffee, AlertCircle } from 'lucide-react';

interface DayData {
    day: number;
    date: string;
    status?: string | null;
    leaveType?: string | null;
    timeIn?: string | null;
    timeOut?: string | null;
}

interface AttendanceCalendarProps {
    record: {
        days: DayData[];
    };
    month: number;
    year: number;
}

export function AttendanceCalendar({ record, month, year }: AttendanceCalendarProps) {
    const t = useTranslations('Attendance');
    const locale = useLocale();
    const dateLocale = locale === 'th' ? th : enUS;

    const startDate = new Date(year, month - 1, 1);
    const endDate = endOfMonth(startDate);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // padding days for start of month
    const startDayOfWeek = startDate.getDay();
    const paddingDays = Array.from({ length: startDayOfWeek }, (_, i) => null);

    const weekdays = locale === 'th' 
        ? ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="bg-white dark:bg-[#252525] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="grid grid-cols-7 border-b border-gray-100 dark:border-white/5">
                {weekdays.map((day, i) => (
                    <div key={day} className={clsx(
                        "p-4 text-center text-xs font-bold tracking-wider uppercase",
                        i === 0 || i === 6 ? "text-rose-500" : "text-gray-500 dark:text-gray-400"
                    )}>
                        {day}
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-7">
                {paddingDays.map((_, i) => (
                    <div key={`pad-${i}`} className="h-32 bg-gray-50/50 dark:bg-white/5 border-b border-r border-gray-100 dark:border-white/5" />
                ))}
                
                {days.map((date) => {
                    const dayData = record.days.find(d => d.day === date.getDate());
                    const isWknd = date.getDay() === 0 || date.getDay() === 6;
                    const isTdy = isToday(date);

                    return (
                        <div key={date.toISOString()} className={clsx(
                            "h-32 p-2 border-b border-r border-gray-100 dark:border-white/5 transition-colors group relative",
                            isWknd ? "bg-gray-50/30 dark:bg-white/[0.02]" : "bg-white dark:bg-[#252525]",
                            !isSameMonth(date, startDate) && "opacity-30"
                        )}>
                            <div className="flex justify-between items-start">
                                <span className={clsx(
                                    "text-sm font-bold h-6 w-6 flex items-center justify-center rounded-full",
                                    isTdy ? "bg-green-600 text-white" : "text-gray-400 dark:text-gray-500"
                                )}>
                                    {date.getDate()}
                                </span>
                                
                                {dayData?.status === 'LEAVE' && (
                                    <div className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded uppercase">
                                        {dayData.leaveType || t('leave')}
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 space-y-1">
                                {dayData?.timeIn && (
                                    <div className="flex items-center gap-1 text-[10px] font-medium text-gray-700 dark:text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        {t('timeIn', { time: dayData.timeIn })}
                                    </div>
                                )}
                                {dayData?.timeOut && (
                                    <div className="flex items-center gap-1 text-[10px] font-medium text-gray-700 dark:text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                                        {t('timeOut', { time: dayData.timeOut })}
                                    </div>
                                )}
                                
                                {dayData?.status === 'ABSENT' && !isWknd && (
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-rose-500">
                                        <AlertCircle className="h-3 w-3" />
                                        {t('absent')}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
