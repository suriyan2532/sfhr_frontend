import { UserPlus, CalendarCheck, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Activity {
    type: 'JOIN' | 'LEAVE';
    title: string;
    description: string;
    time: Date;
}

export function ActivityList({ activities }: { activities: Activity[] }) {
    const t = useTranslations('Dashboard');
    return (
        <div className="bg-white dark:bg-[#252525] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-md dark:shadow-none transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    {t('sections.recentActivity')}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                    {activities.length} New
                </span>
            </div>
            
            <div className="space-y-4">
                {activities.map((activity, i) => (
                    <div key={i} className="group flex gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-default">
                        <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                            activity.type === 'JOIN' 
                                ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-100 dark:border-green-500/20 group-hover:scale-110' 
                                : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20 group-hover:scale-110'
                        }`}>
                            {activity.type === 'JOIN' ? <UserPlus className="h-5 w-5" /> : <CalendarCheck className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {activity.title}
                                </p>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-md">
                                    <Clock className="h-3 w-3" />
                                    <span>{activity.time.toLocaleDateString()}</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                                {activity.description}
                            </p>
                        </div>
                    </div>
                ))}
                {activities.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="h-12 w-12 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-3">
                            <Clock className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">No recent activities</p>
                    </div>
                )}
            </div>
            
            <button className="w-full mt-6 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-gray-100 dark:hover:border-white/5">
                View All Activity
            </button>
        </div>
    );
}
