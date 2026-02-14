'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Wallet, CreditCard, Stethoscope, GraduationCap } from 'lucide-react';
import { clsx } from 'clsx';

interface BenefitSummary {
    id: string;
    typeCode: string;
    typeName: string;
    typeNameTh: string | null;
    total: number;
    used: number;
    remaining: number;
}

interface BenefitSummaryCardsProps {
    summaries: BenefitSummary[];
}

const getIcon = (code: string) => {
    switch (code.toUpperCase()) {
        case 'MEDICAL': return <Stethoscope className="h-6 w-6" />;
        case 'TRAINING': return <GraduationCap className="h-6 w-6" />;
        case 'DENTAL': return <CreditCard className="h-6 w-6" />;
        default: return <Wallet className="h-6 w-6" />;
    }
};

const getColor = (code: string) => {
    switch (code.toUpperCase()) {
        case 'MEDICAL': return 'bg-rose-500';
        case 'TRAINING': return 'bg-amber-500';
        case 'DENTAL': return 'bg-emerald-500';
        default: return 'bg-green-500';
    }
};

export function BenefitSummaryCards({ summaries }: BenefitSummaryCardsProps) {
    const t = useTranslations('Benefits');
    const locale = useLocale();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map((summary) => {
                const percentage = Math.min((summary.used / summary.total) * 100, 100);
                const displayName = locale === 'th' ? (summary.typeNameTh || summary.typeName) : summary.typeName;

                return (
                    <div key={summary.id} className="bg-white dark:bg-[#252525] p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={clsx(
                                "p-3 rounded-2xl text-white shadow-lg",
                                getColor(summary.typeCode)
                            )}>
                                {getIcon(summary.typeCode)}
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{displayName}</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                    ฿{summary.remaining.toLocaleString()}
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
                                <span>{t('usedAmount')}</span>
                                <span>{percentage.toFixed(0)}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <div 
                                    className={clsx("h-full transition-all duration-500", getColor(summary.typeCode))}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs font-medium text-gray-400">
                                <span>฿{summary.used.toLocaleString()} {t('of')} ฿{summary.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
            
            {summaries.length === 0 && (
                <div className="col-span-full p-12 text-center bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
                    <Wallet className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">{t('noBudgetsFound')}</p>
                </div>
            )}
        </div>
    );
}
