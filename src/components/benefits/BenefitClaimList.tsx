'use client';

import { useTranslations, useLocale } from 'next-intl';
import { format } from 'date-fns';
import { th, enUS } from 'date-fns/locale';
import { clsx } from 'clsx';
import { Clock, CheckCircle2, XCircle, AlertCircle, FileText } from 'lucide-react';

interface BenefitClaim {
    id: string;
    amount: number;
    claimDate: Date;
    description: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
    benefitType: {
        code: string;
        name: string;
        nameTh: string | null;
    };
    rejectionReason?: string | null;
}

interface BenefitClaimListProps {
    claims: BenefitClaim[];
}

export function BenefitClaimList({ claims }: BenefitClaimListProps) {
    const t = useTranslations('Benefits');
    const locale = useLocale();
    const dateLocale = locale === 'th' ? th : enUS;

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING': return <Clock className="h-4 w-4" />;
            case 'APPROVED': return <CheckCircle2 className="h-4 w-4" />;
            case 'REJECTED': return <XCircle className="h-4 w-4" />;
            default: return <AlertCircle className="h-4 w-4" />;
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20';
            case 'APPROVED': return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20';
            case 'REJECTED': return 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20';
            default: return 'bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-white/10';
        }
    };

    return (
        <div className="bg-white dark:bg-[#252525] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-500" />
                    {t('claimHistory')}
                </h2>
                <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs font-bold rounded-full">
                    {claims.length} {t('claims')}
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-white/[0.02] text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-white/5">
                            <th className="px-6 py-4 font-bold">{t('colBenefitType')}</th>
                            <th className="px-6 py-4 font-bold">{t('colDate')}</th>
                            <th className="px-6 py-4 font-bold">{t('colAmount')}</th>
                            <th className="px-6 py-4 font-bold">{t('colStatus')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {claims.map((claim) => (
                            <tr key={claim.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.01] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900 dark:text-white">
                                        {locale === 'th' ? (claim.benefitType.nameTh || claim.benefitType.name) : claim.benefitType.name}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-0.5 italic">{claim.description || '-'}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                    {format(new Date(claim.claimDate), 'dd MMM yyyy', { locale: dateLocale })}
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                    ฿{claim.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className={clsx(
                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border",
                                        getStatusStyles(claim.status)
                                    )}>
                                        {getStatusIcon(claim.status)}
                                        {t(`status.${claim.status.toLowerCase()}`)}
                                    </div>
                                    {claim.status === 'REJECTED' && claim.rejectionReason && (
                                        <div className="text-[10px] text-rose-500 mt-1 pl-1 border-l border-rose-200">
                                            {claim.rejectionReason}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {claims.length === 0 && (
                <div className="p-12 text-center">
                    <p className="text-gray-400 text-sm">{t('noClaimsFound')}</p>
                </div>
            )}
        </div>
    );
}
