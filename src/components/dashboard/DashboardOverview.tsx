import {
  Users,
  CalendarCheck,
  UserMinus,
  Clock,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { StatCard } from "./StatCard";
import { ActivityList } from "./ActivityList";
import { DashboardLineChart } from "./charts/DashboardLineChart";
import { DashboardBarChart } from "./charts/DashboardBarChart";
import { DashboardDonutChart } from "./charts/DashboardDonutChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "@/navigation";

interface DashboardData {
  stats: {
    totalEmployees: number;
    presentToday: number;
    onLeaveToday: number;
    pendingApprovals: number;
  };
  trendData: Array<{
    date: string;
    fullDate: string;
    count: number;
  }>;
  activities: {
    recentEmployees: Array<{
      id?: string;
      firstName: string;
      lastName: string;
      createdAt: Date;
    }>;
    recentLeaves: Array<{
      id: string;
      employee: { firstName: string; lastName: string };
      leaveType: { name: string };
      updatedAt: Date;
      status: string;
    }>;
  };
}

interface OverviewProps {
  data: DashboardData;
}

export async function DashboardOverview({ data }: OverviewProps) {
  const t = await getTranslations("Dashboard");

  // Transform raw data into structured activities
  const activities = [
    ...data.activities.recentEmployees.map((emp) => ({
      type: "JOIN" as const,
      title: t("activities.joinTitle"),
      description: t("activities.joinDesc", {
        name: `${emp.firstName} ${emp.lastName}`,
      }),
      time: new Date(emp.createdAt),
    })),
    ...data.activities.recentLeaves.map((leave) => ({
      type: "LEAVE" as const,
      title: t("activities.leaveTitle"),
      description: t("activities.leaveDesc", {
        name: leave.employee.firstName,
        type: leave.leaveType.name,
      }),
      time: new Date(leave.updatedAt),
    })),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">{t("subtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("search")}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t("stats.totalEmployees")}
          value={data.stats.totalEmployees}
          icon={Users}
          color="bg-info/10 text-info"
          description="+2% this month"
        />
        <StatCard
          title={t("stats.presentToday")}
          value={data.stats.presentToday}
          icon={CalendarCheck}
          color="bg-success/10 text-success"
        />
        <StatCard
          title={t("stats.onLeaveToday")}
          value={data.stats.onLeaveToday}
          icon={UserMinus}
          color="bg-destructive/10 text-destructive"
        />
        <StatCard
          title={t("stats.pendingApprovals")}
          value={data.stats.pendingApprovals}
          icon={Clock}
          color="bg-warning/10 text-warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardLineChart />
            <DashboardDonutChart />
          </div>

          <DashboardBarChart />

          {/* Featured Action Card */}
          <Card className="bg-primary text-primary-foreground overflow-hidden border-none shadow-xl">
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl">
                {t("sections.pendingRequests")}
              </CardTitle>
              <CardDescription className="text-primary-foreground/80 text-lg">
                {t("sections.pendingRequestsDesc", {
                  count: data.stats.pendingApprovals,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-4">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="font-bold border-none"
              >
                <Link href="/approvals" className="flex items-center gap-2">
                  {t("actions.goToApprovals")}{" "}
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          </Card>
        </div>

        {/* Right Column: Activities & Quick Links */}
        <div className="space-y-8">
          <ActivityList activities={activities} />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("sections.quickLinks")}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {[
                { label: t("links.requestLeave"), href: "/leaves" },
                { label: t("links.employeeList"), href: "/employees" },
                { label: t("links.organization"), href: "/organization" },
                { label: t("links.settings"), href: "/settings/master" },
              ].map((link) => (
                <Button
                  key={link.href}
                  asChild
                  variant="ghost"
                  className="justify-between w-full h-12 text-muted-foreground hover:text-foreground"
                >
                  <Link href={link.href}>
                    {link.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
