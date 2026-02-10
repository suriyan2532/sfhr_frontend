import { StatCard } from '@/components/dashboard/StatCard';
import { CalendarRange, CalendarCheck, CalendarX } from 'lucide-react';

interface LeaveStatsProps {
    stats: { type: string, used: number, total: number, code: string }[];
}

export function LeaveStats({ stats }: LeaveStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
                let Icon = CalendarRange;
                let color = "bg-blue-100 text-blue-600";
                
                if (stat.code === 'S') { Icon = CalendarX; color = "bg-red-100 text-red-600"; }
                if (stat.code === 'V') { Icon = CalendarCheck; color = "bg-green-100 text-green-600"; }
                if (stat.code === 'P') { Icon = CalendarRange; color = "bg-yellow-100 text-yellow-600"; }

                return (
                    <StatCard
                        key={stat.code}
                        title={stat.type}
                        value={`${stat.used} / ${stat.total}`}
                        icon={Icon}
                        color={color}
                        description={`${stat.total - stat.used} Remaining`}
                    />
                );
            })}
        </div>
    );
}
