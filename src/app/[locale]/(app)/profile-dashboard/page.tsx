import { auth } from "@/auth";
import { getEmployeeDashboardData } from "@/lib/actions/dashboard-actions";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";
import { redirect } from "@/navigation";

export default async function ProfileDashboardPage() {
  const session = await auth();

  // Security check: Ensure only authorized roles access this page?
  // Or just let anyone with data see it. stricter: check role.
  // For now, if data fetch fails, we redirect to login or show error.

  const employeeData = await getEmployeeDashboardData();

  if (!employeeData) {
    // If fetching fails (e.g. token expired or not employee), redirect to login
    // redirect({ href: '/login', locale: 'th' }); // Need locale context
    return (
      <div className="p-8">
        Unable to load profile data. Please try logging in again.
      </div>
    );
  }

  return <EmployeeDashboard data={employeeData} />;
}
