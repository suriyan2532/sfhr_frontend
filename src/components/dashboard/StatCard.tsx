import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    color: string;
    description?: string;
}

export function StatCard({ title, value, icon: Icon, color, description }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-[#252525] p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
                {description && <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">{description}</span>}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
            </div>
        </div>
    );
}
