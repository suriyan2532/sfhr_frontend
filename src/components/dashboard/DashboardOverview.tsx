import { 
    Users, 
    CalendarCheck, 
    UserMinus, 
    Clock, 
    CheckCircle2,
    ArrowUpRight,
    Search
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { StatCard } from './StatCard';
import { AttendanceChart } from './AttendanceChart';
import { ActivityList } from './ActivityList';
import { DashboardLineChart } from './charts/DashboardLineChart';
import { DashboardBarChart } from './charts/DashboardBarChart';
import { DashboardDonutChart } from './charts/DashboardDonutChart';

interface OverviewProps {
    data: any;
}

export async function DashboardOverview({ data }: OverviewProps) {
    const t = await getTranslations('Dashboard');

    // Transform raw data into structured activities
    const activities = [
        ...data.activities.recentEmployees.map((emp: any) => ({
            type: 'JOIN' as const,
            title: t('activities.joinTitle'),
            description: t('activities.joinDesc', { name: `${emp.firstName} ${emp.lastName}` }),
            time: emp.createdAt
        })),
        ...data.activities.recentLeaves.map((leave: any) => ({
            type: 'LEAVE' as const,
            title: t('activities.leaveTitle'),
            description: t('activities.leaveDesc', { name: leave.employee.firstName, type: leave.leaveType.name }),
            time: leave.updatedAt
        }))
    ].sort((a: any, b: any) => b.time.getTime() - a.time.getTime()).slice(0, 5);

    return (
        <div className="space-y-8 p-6 lg:p-10 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t('title')}</h1>
                    <p className="text-gray-500 mt-2 font-medium">{t('subtitle')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder={t('search')} 
                            className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 shadow-sm transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title={t('stats.totalEmployees')} 
                    value={data.stats.totalEmployees} 
                    icon={Users} 
                    color="bg-indigo-50 text-indigo-600"
                    description="+2% this month"
                />
                <StatCard 
                    title={t('stats.presentToday')} 
                    value={data.stats.presentToday} 
                    icon={CalendarCheck} 
                    color="bg-emerald-50 text-emerald-600"
                />
                <StatCard 
                    title={t('stats.onLeaveToday')} 
                    value={data.stats.onLeaveToday} 
                    icon={UserMinus} 
                    color="bg-rose-50 text-rose-600"
                />
                <StatCard 
                    title={t('stats.pendingApprovals')} 
                    value={data.stats.pendingApprovals} 
                    icon={Clock} 
                    color="bg-amber-50 text-amber-600"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Chart & Summary */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DashboardLineChart />
                        <DashboardDonutChart />
                    </div>
                    
                    <DashboardBarChart />
                    
                    {/* Quick Access or Summary */}
                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">{t('sections.pendingRequests')}</h3>
                            <p className="text-indigo-100 mb-6 max-w-sm">{t('sections.pendingRequestsDesc', { count: data.stats.pendingApprovals })}</p>
                            <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-900/20">
                                {t('actions.goToApprovals')} <ArrowUpRight className="h-4 w-4" />
                            </button>
                        </div>
                        {/* Decorative blobs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl animate-pulse"></div>
                    </div>
                </div>

                {/* Right Column: Activities */}
                <div className="space-y-8">
                    <ActivityList activities={activities} />
                    
                    {/* Upcoming Holidays / Events placeholder */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">{t('sections.quickLinks')}</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {['Add Employee', 'Organization Chart', 'Leave Policy', 'Settings'].map((link) => (
                                <button key={link} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 text-sm font-medium text-gray-700">
                                    {link}
                                    <ArrowUpRight className="h-4 w-4 text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
