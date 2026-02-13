"use client";

import { Link, usePathname } from "@/navigation"; // Use localized Link
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
  X,
} from "lucide-react";
import { clsx } from "clsx";
import { useTranslations } from "next-intl";

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");

  const navigation = [
    { name: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { name: t("employeeManagement"), href: "/employees", icon: Users },
    { name: t("organization"), href: "/organization", icon: Building2 },
    { name: t("chainOfCommand"), href: "/chain-of-command", icon: GitGraph },
    { name: t("masterData"), href: "/settings/master", icon: Settings },
    { name: t("timeAttendance"), href: "/attendance", icon: Clock },
    { name: t("leaveManagement"), href: "/leaves", icon: CalendarDays },
    { name: t("benefits"), href: "/dashboard/benefits", icon: Banknote },
    { name: t("userInformation"), href: "/users", icon: Users },
    { name: t("settings"), href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-zinc-900/50 backdrop-blur-sm transition-opacity md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sidebar component */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-3xl border-r border-gray-200/50 dark:border-white/5 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:flex md:w-72 md:flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-amber-600 dark:bg-amber-500/80 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Safari HR
            </span>
          </Link>
          <button
            type="button"
            className="md:hidden p-1 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
                    isActive
                      ? "bg-amber-50 dark:bg-amber-500/20 text-amber-600 dark:text-amber-200 border border-amber-200 dark:border-amber-500/20 shadow-sm dark:shadow-lg shadow-amber-500/5"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border border-transparent",
                  )}
                >
                  <item.icon
                    className={clsx(
                      "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                      isActive
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-amber-500 dark:group-hover:text-amber-300",
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
        <div className="p-4 border-t border-gray-200 dark:border-white/10">
          <p className="text-xs text-center text-gray-500 dark:text-gray-500">
            v1.0.0 &copy; 2026 Safari HR
          </p>
        </div>
      </div>
    </>
  );
}
