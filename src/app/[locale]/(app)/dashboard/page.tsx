import { auth } from '@/auth';
import { getDashboardSummary } from '@/lib/actions/dashboard-actions';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';

export default async function DashboardPage() {
  const session = await auth();
  const summaryData = await getDashboardSummary();

  return <DashboardOverview data={summaryData} />;
}
