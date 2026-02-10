'use client';

import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { th, enUS } from 'date-fns/locale';
import { useLocale } from 'next-intl';

interface LeaveRequest {
    id: string;
    leaveType: { name: string; code: string };
    startDate: Date;
    endDate: Date;
    days: number;
    status: string;
    reason: string | null;
}

export function LeaveRequestList({ requests }: { requests: LeaveRequest[] }) {
    const t = useTranslations('Leave');
    const locale = useLocale();
    const dateLocale = locale === 'th' ? th : enUS;

    return (
        <div className="bg-white dark:bg-[#252525] rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('history')}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">{t('type')}</th>
                            <th className="px-6 py-4">{t('dates')}</th>
                            <th className="px-6 py-4 text-center">{t('days')}</th>
                            <th className="px-6 py-4">{t('reason')}</th>
                            <th className="px-6 py-4">{t('status')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                    {t('noHistory')}
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-white">{req.leaveType.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{req.leaveType.code}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                        {format(new Date(req.startDate), 'dd MMM yyyy', { locale: dateLocale })} - 
                                        {format(new Date(req.endDate), 'dd MMM yyyy', { locale: dateLocale })}
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-900 dark:text-white font-medium">{req.days}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs truncate">{req.reason || '-'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${req.status === 'APPROVED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
                                            ${req.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                                            ${req.status === 'REJECTED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : ''}
                                            ${req.status === 'CANCELLED' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-400' : ''}
                                        `}>
                                            {req.status.toLowerCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
