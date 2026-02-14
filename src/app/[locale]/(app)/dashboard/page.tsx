import { auth } from "@/auth";
import {
  getDashboardSummary,
  getEmployeeDashboardData,
} from "@/lib/actions/dashboard-actions";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";

export default async function DashboardPage() {
  const session = await auth();

  // Check if user is an Employee (and not Admin/HR who might want the overview)
  // Adjust this logic if Admins also want to see their own employee dashboard
  if (session?.user?.role === "EMPLOYEE" || session?.user?.role === "MANAGER") {
    const employeeData = await getEmployeeDashboardData();
    // Fallback to overview if fetch fails or data is null, or handle error
    if (employeeData) {
      return <EmployeeDashboard data={employeeData} />;
    }
  }

  const summaryData = await getDashboardSummary();

  return <DashboardOverview data={summaryData} />;
}
