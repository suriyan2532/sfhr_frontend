import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { BenefitSummaryCards } from '@/components/benefits/BenefitSummaryCards';
import { BenefitClaimList } from '@/components/benefits/BenefitClaimList';
import { BenefitClaimForm } from '@/components/benefits/BenefitClaimForm';
import { getBenefitSummary, getBenefitClaims, getBenefitTypes } from '@/lib/actions/benefit-actions';
import { Wallet, Info } from 'lucide-react';
import { redirect } from '@/navigation';

export default async function BenefitsPage() {
    const t = await getTranslations('Benefits');
    const session = await auth();
    
    if (!session?.user?.email) {
        redirect({ href: '/login', locale: 'th' });
        return null;
    }

    const email = session.user.email;
    const user = await prisma.user.findUnique({
        where: { email },
        select: { employeeId: true }
    });

    if (!user?.employeeId) {
        return (
            <div className="p-10 text-center">
                <div className="max-w-md mx-auto bg-amber-50/50 dark:bg-amber-900/10 backdrop-blur-xl p-8 rounded-[2rem] border border-amber-200/20 shadow-xl">
                    <Info className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-2">Employee Profile Not Linked</h2>
                    <p className="text-amber-700 dark:text-amber-400 text-sm">
                        Your user account is not linked to an employee profile. Please contact HR to set up your benefits.
                    </p>
                </div>
            </div>
        );
    }

    const [summaries, claims, types] = await Promise.all([
        getBenefitSummary(user.employeeId),
        getBenefitClaims(user.employeeId),
        getBenefitTypes()
    ]);

    return (
        <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-transparent">
          <div className="space-y-10 p-8 lg:p-12 bg-white/40 dark:bg-black/20 backdrop-blur-3xl border border-white/20 dark:border-white/5 rounded-[2.5rem] shadow-2xl shadow-black/5 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                            <Wallet className="h-6 w-6" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            {t('title')}
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        {t('subtitle')}
                    </p>
                </div>
                
                <BenefitClaimForm benefitTypes={types} />
            </div>

            <section className="space-y-6">
                <BenefitSummaryCards summaries={summaries} />
            </section>

            <section className="space-y-6">
                <BenefitClaimList claims={claims as any} />
            </section>
          </div>
        </div>
    );
}
