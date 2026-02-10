'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { useTransition, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(l => l.code === locale) || languages[0];

  const handleLanguageChange = (nextLocale: string) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium text-gray-200 hover:text-white"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="uppercase">{currentLanguage.code}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
            <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-[#2a2a2a] border border-white/10 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
            <div className="py-1">
                {languages.map((language) => (
                <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`group flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors
                    ${locale === language.code 
                        ? 'bg-blue-500/10 text-blue-400' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                >
                    <span className="text-lg">{language.flag}</span>
                    <span className="font-medium">{language.label}</span>
                </button>
                ))}
            </div>
            </div>
        </>
      )}
    </div>
  );
}
