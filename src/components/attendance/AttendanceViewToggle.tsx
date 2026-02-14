'use client';

import { useTranslations } from 'next-intl';
import { User, Users } from 'lucide-react';
import { clsx } from 'clsx';

interface ViewToggleProps {
    view: 'self' | 'team';
    onViewChange: (view: 'self' | 'team') => void;
}

export function AttendanceViewToggle({ view, onViewChange }: ViewToggleProps) {
    const t = useTranslations('Attendance');

    return (
        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl w-fit">
            <button
                onClick={() => onViewChange('self')}
                className={clsx(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                    view === 'self' 
                        ? "bg-white dark:bg-green-600 text-green-600 dark:text-white shadow-sm" 
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                )}
            >
                <User className="h-4 w-4" />
                {t('viewSelf')}
            </button>
            <button
                onClick={() => onViewChange('team')}
                className={clsx(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                    view === 'team' 
                        ? "bg-white dark:bg-green-600 text-green-600 dark:text-white shadow-sm" 
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                )}
            >
                <Users className="h-4 w-4" />
                {t('viewTeam')}
            </button>
        </div>
    );
}
