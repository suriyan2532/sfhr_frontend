'use client';

import { Link, usePathname } from '@/navigation'; // Use localized Link
// import Link from 'next/link'; // REMOVED
// import { usePathname } from 'next/navigation'; // REMOVED - usage in next-intl is slightly different or same but better validation? 
// actually navigation.ts exports usePathname as well.

import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Clock, 
  CalendarDays, 
  Banknote, 
  GitGraph,
  Settings,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  const navigation = [
    { name: t('dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('employeeManagement'), href: '/dashboard/employees', icon: Users },
    { name: t('organization'), href: '/dashboard/organization', icon: Building2 },
    { name: t('chainOfCommand'), href: '/dashboard/chain-of-command', icon: GitGraph },
    { name: t('masterData'), href: '/dashboard/settings/master', icon: Settings },
    { name: t('timeAttendance'), href: '/dashboard/attendance', icon: Clock },
    { name: t('leaveManagement'), href: '/dashboard/leaves', icon: CalendarDays },
    { name: t('payrollBenefits'), href: '/dashboard/payroll', icon: Banknote },
    { name: t('settings'), href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      <div 
        className={clsx(
          "fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar component */}
      <div 
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:flex md:w-72 md:flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Safari HR</span>
          </Link>
          <button 
            type="button" 
            className="md:hidden p-1 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* User Profile Summary (Optional for Sidebar, usually in Header) */}
        
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <nav className="space-y-1">
            {navigation.map((item) => {
              // Pathname includes locale in standard next navigation? 
              // next-intl usePathname returns path WITHOUT locale.
              // So exact match or startsWith works fine.
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon 
                    className={clsx(
                      "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                      isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Version */}
        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400">
            v1.0.0 &copy; 2026 Safari HR
          </p>
        </div>
      </div>
    </>
  );
}
