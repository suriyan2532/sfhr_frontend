import { auth } from "@/auth";
import { getManagerDashboardData } from "@/lib/actions/dashboard-actions";
import { ManagerDashboard } from "@/components/dashboard/ManagerDashboard";

export default async function ManagerDashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await auth();

  // Optional: Check role here if we want strict access control
  // if (session?.user?.role !== 'MANAGER') { ... }

  const managerData = await getManagerDashboardData();

  if (!managerData) {
    return (
      <div className="p-8">
        Unable to load team data. You might not be assigned as a manager.
      </div>
    );
  }

  return <ManagerDashboard data={managerData} />;
}
