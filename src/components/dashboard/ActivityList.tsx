import { UserPlus, CalendarCheck, Clock } from 'lucide-react';

interface Activity {
    type: 'JOIN' | 'LEAVE';
    title: string;
    description: string;
    time: Date;
}

export function ActivityList({ activities }: { activities: Activity[] }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-6">
                {activities.map((activity, i) => (
                    <div key={i} className="flex gap-4">
                        <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === 'JOIN' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                            {activity.type === 'JOIN' ? <UserPlus className="h-5 w-5" /> : <CalendarCheck className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{activity.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                            <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                                <Clock className="h-3 w-3" />
                                <span>{activity.time.toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
                {activities.length === 0 && (
                    <p className="text-center text-sm text-gray-500 py-10">No recent activities</p>
                )}
            </div>
        </div>
    );
}
