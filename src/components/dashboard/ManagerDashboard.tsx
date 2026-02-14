"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  CalendarCheck,
  UserMinus,
  Clock,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Plane,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ManagerDashboardProps {
  data: any;
}

export function ManagerDashboard({ data }: ManagerDashboardProps) {
  const t = useTranslations("Dashboard");

  if (!data) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading team data...
      </div>
    );
  }

  const { stats, teamMembers, pendingRequests, recentActivity } = data;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("managerTitle")}
          </h1>
          <p className="text-muted-foreground">{t("managerSubtitle")}</p>
        </div>
        <Button asChild>
          <Link href="/approvals">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {t("reviewRequests")}
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: t("totalTeam"),
            value: stats.totalTeamMembers,
            icon: Users,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
          },
          {
            label: t("presentToday"),
            value: stats.presentToday,
            icon: CalendarCheck,
            color: "text-green-500",
            bg: "bg-green-500/10",
          },
          {
            label: t("onLeaveToday"),
            value: stats.onLeaveToday,
            icon: Plane,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            label: t("pendingApprovals"),
            value: stats.pendingApprovals,
            icon: Clock,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Requests Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                {t("pendingRequests")}
              </CardTitle>
              <CardDescription>
                {t("pendingRequestsDesc", { count: pendingRequests.length })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRequests.length > 0 ? (
                <div className="space-y-4">
                  {pendingRequests.map((req: any) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={req.Employee?.photo_url} />
                          <AvatarFallback>
                            {req.Employee?.first_name_th?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {req.Employee?.first_name_th}{" "}
                            {req.Employee?.last_name_th}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline">
                              {req.LeaveType?.name}
                            </Badge>
                            <span>•</span>
                            <span>
                              {format(new Date(req.startDate), "dd MMM")} -{" "}
                              {format(new Date(req.endDate), "dd MMM")}
                            </span>
                            <span>({req.daysCount} days)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/approvals`}>{t("review")}</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>{t("noPendingRequests")}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>{t("recentTeamActivity")}</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {activity.Employee?.first_name_th?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">
                            {activity.Employee?.first_name_th}
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            requested{" "}
                          </span>
                          <span className="font-medium">
                            {activity.LeaveType?.name}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(
                            new Date(activity.createdAt),
                            "dd MMM yyyy, HH:mm",
                          )}
                        </p>
                      </div>
                      <Badge
                        variant={
                          activity.status === "APPROVED"
                            ? "success"
                            : ("secondary" as any)
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  {t("noActivity")}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Team List */}
        <div>
          <Card className="h-full shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                {t("myTeam")}
              </CardTitle>
              <CardDescription>
                {teamMembers.length} {t("members")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member: any) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={member.photo_url} />
                      <AvatarFallback>
                        {member.first_name_th?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {member.first_name_th} {member.last_name_th}
                      </p>
                      {/* <p className="text-xs text-muted-foreground">{member.position_id}</p>  Normally map ID to Title */}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    asChild
                  >
                    <Link href={`/employees/${member.id}`}>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/employees?filter=team">{t("viewAllTeam")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
