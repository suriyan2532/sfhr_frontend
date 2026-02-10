'use client';

import { 
  Bell, 
  Search, 
  Menu,
  ChevronDown,
  User 
} from 'lucide-react';
import { useState } from 'react';
import { signOut } from 'next-auth/react'; // Client-side sign out? Or use server action?
import LanguageSwitcher from '../common/LanguageSwitcher';
import { ThemeToggle } from '../common/ThemeToggle';
// Better to use a form for signout or client side wrapper. For now, let's just make UI.

interface HeaderProps {
  onMenuClick: () => void;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export function Header({ onMenuClick, user }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-white/10 h-16 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-md transition-colors duration-300">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        
        {/* Left: Mobile Menu & Search */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="md:hidden -ml-2 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-md"
            onClick={onMenuClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden sm:flex items-center max-w-xs relative text-gray-400 focus-within:text-gray-600 dark:focus-within:text-white">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5" />
            </div>
            <input
              name="search"
              id="search"
              className="block w-full pl-10 pr-3 py-1.5 border border-transparent rounded-xl leading-5 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/30 focus:outline-none focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-blue-500/50 dark:focus:border-white/20 sm:text-sm transition-all duration-300"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <div className="h-8 w-[1px] bg-gray-200 dark:bg-white/10 mx-2" />
          <ThemeToggle />

          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors relative">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-white/10" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center gap-2 max-w-xs rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1e1e1e] p-1 pl-3 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="flex flex-col items-end hidden sm:block">
                <span className="text-sm font-medium text-gray-700 dark:text-white">{user?.name || 'User'}</span>
                <span className="text-xs text-gray-500 dark:text-blue-200">{user?.role || 'Employee'}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white border border-white/20">
                {user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                   <img className="h-8 w-8 rounded-full" src={user.image} alt="" />
                ) : (
                   <User className="h-4 w-4" />
                )}
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-white/10 py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-white/10 sm:hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                >
                  Settings
                </a>
                <a
                  href="/api/auth/signout" // Simple fallback
                  className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                  onClick={(e) => {
                      // Optional: handle client side transition or just let link work
                  }}
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
