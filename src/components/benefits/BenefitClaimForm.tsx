'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Plus, X, Upload, Info } from 'lucide-react';
import { submitBenefitClaim } from '@/lib/actions/benefit-actions';
import { clsx } from 'clsx';

interface BenefitType {
    id: string;
    code: string;
    name: string;
    nameTh: string | null;
}

interface BenefitClaimFormProps {
    benefitTypes: BenefitType[];
}

export function BenefitClaimForm({ benefitTypes }: BenefitClaimFormProps) {
    const t = useTranslations('Benefits');
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const result = await submitBenefitClaim(formData);

        if (result.success) {
            setIsOpen(false);
            event.currentTarget.reset();
        } else {
            setError(result.error || 'Something went wrong');
        }
        setIsSubmitting(false);
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
                <Plus className="h-5 w-5" />
                {t('submitClaim')}
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#202020] w-full max-w-lg rounded-3xl border border-gray-100 dark:border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between bg-gray-50/50 dark:bg-white/[0.02]">
                    <h2 className="text-xl font-extrabold text-gray-900 dark:text-white uppercase tracking-tight">
                        {t('submitClaim')}
                    </h2>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-colors text-gray-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-600 dark:text-rose-400 text-sm font-medium">
                            <Info className="h-5 w-5 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">
                            {t('labelBenefitType')}
                        </label>
                        <select
                            name="benefitTypeId"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer font-medium"
                        >
                            <option value="">{t('selectType')}</option>
                            {benefitTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {locale === 'th' ? (type.nameTh || type.name) : type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">
                            {t('labelAmount')}
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 text-lg">฿</span>
                            <input
                                type="number"
                                name="amount"
                                required
                                step="0.01"
                                placeholder="0.00"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-lg"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">
                            {t('labelDescription')}
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            placeholder={t('descriptionPlaceholder')}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-sm font-medium"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={clsx(
                                "w-full py-4 rounded-2xl font-extrabold text-white uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/10 active:scale-95",
                                isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600"
                            )}
                        >
                            {isSubmitting ? t('submitting') : t('submitNow')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
