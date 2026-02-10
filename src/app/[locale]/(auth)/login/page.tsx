import LoginForm from '@/components/auth/LoginForm';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage() {
  const t = await getTranslations('Auth');

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gray-100 dark:bg-[#1e1e1e] flex items-center justify-center font-[Rubik,sans-serif] transition-colors duration-300">
        {/* Background Image - Only visible in dark mode or with overlay */}
        <div 
            className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2076&q=80')] bg-cover bg-center transition-transform duration-700 hover:scale-105 opacity-20 dark:opacity-100"
            style={{ filter: 'brightness(0.7)' }}
        />
        
        {/* Gradient Overlay */}
        <div className="fixed inset-0 z-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent" />


        {/* Language Switcher and Theme Toggle */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
            <ThemeToggle />
            <div className="h-6 w-[1px] bg-gray-300 dark:bg-white/20" />
            <LanguageSwitcher />
        </div>

        {/* Glass Container */}
        <div className="relative z-10 w-full max-w-md p-8 sm:p-10 mx-4 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="mb-8 text-center space-y-2">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Safari HR</h1>
                <p className="text-blue-600 dark:text-blue-200 text-sm font-medium uppercase tracking-wider">{t('loginTitle')}</p>
            </div>
            
            <LoginForm />
            
            <div className="mt-8 text-center">
                <p className="text-xs text-gray-500 dark:text-white/40">{t('authorizedOnly')}</p>
            </div>
        </div>
    </main>
  );
}
