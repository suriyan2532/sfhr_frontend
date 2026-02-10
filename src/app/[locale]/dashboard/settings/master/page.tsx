import { getTranslations } from 'next-intl/server';
import { 
  UserCircle2, 
  Users, 
  UserSquare2, 
  Building2, 
  UnfoldHorizontal, 
  Network, 
  Briefcase, 
  FileText, 
  CalendarOff, 
  Timer, 
  UserCog, 
  ShieldCheck,
  UserPlus,
  Clock,
  CalendarDays
} from 'lucide-react';
import { Link } from '@/navigation';

export default async function MasterDataPage() {
  const t = await getTranslations('MasterData');

  const categories = [
    { key: 'recruitment', icon: UserPlus, color: 'bg-blue-500' },
    { key: 'employee', icon: UserCircle2, color: 'bg-emerald-500' },
    { key: 'employeeGroup', icon: Users, color: 'bg-indigo-500' },
    { key: 'employeeType', icon: UserSquare2, color: 'bg-purple-500' },
    { key: 'company', icon: Building2, color: 'bg-amber-500' },
    { key: 'unit', icon: UnfoldHorizontal, color: 'bg-orange-500' },
    { key: 'department', icon: Network, color: 'bg-cyan-500' },
    { key: 'position', icon: Briefcase, color: 'bg-rose-500' },
    { key: 'jobDescription', icon: FileText, color: 'bg-slate-500' },
    { key: 'leaveType', icon: CalendarOff, color: 'bg-pink-500' },
    { key: 'otType', icon: Timer, color: 'bg-yellow-500' },
    { key: 'user', icon: UserCog, color: 'bg-blue-600' },
    { key: 'permission', icon: ShieldCheck, color: 'bg-emerald-600' },
    { key: 'workingShift', icon: Clock, color: 'bg-indigo-600' },
    { key: 'companyHoliday', icon: CalendarDays, color: 'bg-rose-600' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50/50 rounded-xl">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 p-6 sm:p-8 rounded-xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('subtitle')}</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="flex-1 p-6 sm:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.key}
                href={`/dashboard/settings/master/${cat.key.replace(/([A-Z])/g, '-$1').toLowerCase()}`}
                className="group relative flex flex-col p-6 bg-white rounded-2xl border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                  <cat.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {t(`categories.${cat.key}`)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {t('manageDesc', { category: t(`categories.${cat.key}`) })}
                  </p>
                </div>
                
                {/* Visual Hint */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-indigo-500 text-lg">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
