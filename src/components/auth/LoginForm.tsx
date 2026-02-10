'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/auth-actions';
import { Link } from '@/navigation';
import { useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';

function LoginButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('Auth');
 
  return (
    <button 
      className="w-full flex justify-center py-3 px-4 rounded-xl shadow-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-white/20 dark:hover:bg-white/30 border border-transparent dark:border-white/10 backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? (
        <span className="flex items-center gap-2">
            <span className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            {t('signingIn')}
        </span>
      ) : t('signIn')}
    </button>
  );
}

export default function LoginForm() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);
  const t = useTranslations('Auth');
 
  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-4">
        <div>
            <label htmlFor="username" className="block text-xs font-medium text-blue-600 dark:text-blue-200 uppercase tracking-wider mb-1.5 ml-1">
            {t('username')}
            </label>
            <div className="relative group">
            <input
                id="username"
                name="username"
                type="text"
                required
                className="block w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:bg-gray-50 dark:group-hover:bg-white/10"
                placeholder="admin"
            />
            </div>
        </div>
    
        <div>
            <label htmlFor="password" className="block text-xs font-medium text-blue-600 dark:text-blue-200 uppercase tracking-wider mb-1.5 ml-1">
            {t('password')}
            </label>
            <div className="relative group">
            <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="block w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:bg-gray-50 dark:group-hover:bg-white/10"
                placeholder="••••••"
            />
            </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 dark:text-blue-500 bg-gray-100 dark:bg-white/10 border-gray-300 dark:border-white/20 rounded focus:ring-offset-0 focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-blue-100/80">
            {t('rememberMe')}
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 dark:text-blue-300 hover:text-blue-500 dark:hover:text-white transition-colors">
            {t('forgotPassword')}
          </a>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <LoginButton />
        <Link 
          href="/dashboard"
          className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-medium text-gray-500 dark:text-white/70 hover:text-gray-900 dark:hover:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all duration-300"
        >
          {t('skipToDashboard')}
        </Link>
      </div>
      
      {errorMessage && (
        <div
          className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <p className="text-sm text-red-200">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
