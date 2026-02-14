import { auth } from "@/auth";
import {
  getCompanyDashboardData,
  getDashboardSummary,
} from "@/lib/actions/dashboard-actions";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { redirect } from "@/navigation";

export default async function DashboardPage() {
  const session = await auth();
  const role = session?.user?.role;
  console.log("Dashboard Redirect Logic - Role:", role);

  // 1. Employee -> Profile Dashboard
  if (role === "EMPLOYEE") {
    redirect({ href: "/profile-dashboard", locale: "th" }); // Defaulting locale, but ideally preserve
  }

  // 2. Manager -> Manager Dashboard
  if (role === "MANAGER") {
    redirect({ href: "/manager-dashboard", locale: "th" });
  }

  // 3. Company Dashboard (HR, ADMIN, SUPER_ADMIN)
  let companyData = await getCompanyDashboardData();

  if (!companyData) {
    companyData = await getDashboardSummary();
  }

  return <DashboardOverview data={companyData} />;
}
