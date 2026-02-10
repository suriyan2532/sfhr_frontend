import { getLeaveSummary, getLeaveRequests, getLeaveTypes } from '@/lib/actions/leave-actions';
import { LeaveStats } from '@/components/leaves/LeaveStats';
import { LeaveRequestList } from '@/components/leaves/LeaveRequestList';
import { LeaveRequestForm } from '@/components/leaves/LeaveRequestForm';
import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export default async function LeavePage() {
    const t = await getTranslations('Leave');
    // Authenticate and get user
    const session = await auth();
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return <div>{t('status')}</div>; // Or redirect to login
    }

    // Fetch Employee ID
    const user = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { employee: true }
    });

    if (!user?.employee) {
        return (
            <div className="p-6">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/30">
                    {t('noProfileLinked')}
                </div>
            </div>
        );
    }
    
    const employeeId = user.employee.id;
    
    // FETCH DATA
    const leaveTypes = await getLeaveTypes();
    const stats = await getLeaveSummary(employeeId);
    const requests = await getLeaveRequests(employeeId);

    return (
        <div className="flex flex-col h-full bg-gray-50/50 dark:bg-black rounded-xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('subtitle')}</p>
                </div>
                <LeaveRequestForm leaveTypes={leaveTypes} />
            </div>

            <LeaveStats stats={stats} />
            
            <LeaveRequestList requests={requests} />
        </div>
    );
}
