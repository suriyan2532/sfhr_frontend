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
import { Progress } from "@/components/ui/progress";
import {
  CalendarDays,
  Clock,
  Briefcase,
  User,
  Coffee,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Plane,
  Stethoscope,
  PartyPopper,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { format } from "date-fns";

interface EmployeeDashboardProps {
  data: any; // Type better if possible, but 'any' allows flexibility for now
}

export function EmployeeDashboard({ data }: EmployeeDashboardProps) {
  const t = useTranslations("Dashboard");

  if (!data) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading dashboard data...
      </div>
    );
  }

  const { profile, leaveQuotas, attendanceStats, activities, shiftInfo } = data;

  // Helper to determine greeting based on time
  const hour = new Date().getHours();
  let greetingKey = "goodMorning";
  if (hour >= 12 && hour < 17) greetingKey = "goodAfternoon";
  else if (hour >= 17) greetingKey = "goodEvening";

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 1. Header & Profile Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1"
        >
          <Card className="h-full bg-linear-to-br from-indigo-500 to-purple-600 text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/4 -translate-y-1/4">
              <Briefcase className="w-64 h-64" />
            </div>
            <CardContent className="p-8 flex items-center gap-6 relative z-10">
              <Avatar className="h-24 w-24 border-4 border-white/20 shadow-lg">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-2xl font-bold bg-white/10 text-white backdrop-blur-md">
                  {profile.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">
                  {t(greetingKey as any)}, {profile.fullName}
                </h1>
                <div className="flex flex-wrap gap-2 text-indigo-100">
                  <Badge
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-none"
                  >
                    <Briefcase className="w-3 h-3 mr-1" />
                    {profile.position}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-none"
                  >
                    <User className="w-3 h-3 mr-1" />
                    {profile.department}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/30 text-white"
                  >
                    ID: {profile.employeeCode}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shift Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:w-80"
        >
          <Card className="h-full border-l-4 border-l-amber-500 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                {t("currentShift")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {shiftInfo ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("shiftName")}
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {shiftInfo.name}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {t("time")}
                      </p>
                      <p className="font-semibold text-lg">{shiftInfo.time}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground bg-secondary/50 p-2 rounded-lg">
                    {shiftInfo.workDays}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">{t("noShiftAssigned")}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 2. Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: t("totalWorkingDays"),
            value:
              attendanceStats.present +
              attendanceStats.late +
              attendanceStats.absent +
              attendanceStats.leave,
            icon: CalendarDays,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            label: t("present"),
            value: attendanceStats.present,
            icon: CheckCircle2,
            color: "text-green-500",
            bg: "bg-green-500/10",
          },
          {
            label: t("late"),
            value: attendanceStats.late,
            icon: Clock,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
          },
          {
            label: t("absent"),
            value: attendanceStats.absent,
            icon: XCircle,
            color: "text-red-500",
            bg: "bg-red-500/10",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.05 }}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3. Leave Quotas */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-sky-500" />
                {t("leaveQuotas")}
              </CardTitle>
              <CardDescription>{t("leaveQuotaDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {leaveQuotas.map((quota: any, i: number) => {
                const percentage = Math.min(
                  (quota.used / quota.total) * 100,
                  100,
                );
                const Icon = quota.name.includes("Sick")
                  ? Stethoscope
                  : quota.name.includes("Vacation")
                    ? Plane
                    : Coffee;
                const colorClass = quota.name.includes("Sick")
                  ? "bg-red-500"
                  : quota.name.includes("Vacation")
                    ? "bg-sky-500"
                    : "bg-amber-500";

                return (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2 font-medium">
                        <div
                          className={`p-1.5 rounded-md ${colorClass} bg-opacity-20`}
                        >
                          <Icon
                            className={`w-4 h-4 ${colorClass.replace("bg-", "text-")}`}
                          />
                        </div>
                        {quota.name}
                      </div>
                      <span className="text-muted-foreground">
                        {quota.used} / {quota.total} {t("days")}
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      className="h-2"
                      indicatorColor={colorClass}
                    />
                    <p className="text-xs text-right text-muted-foreground">
                      {quota.remaining} {t("daysRemaining")}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* 4. Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full shadow-md flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <PartyPopper className="w-5 h-5 text-orange-500" />
                {t("recentActivities")}
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/leaves">{t("viewAll")}</Link>
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div
                        className={`mt-1 p-2 rounded-full ${
                          activity.status === "APPROVED"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : activity.status === "REJECTED"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {activity.type === "LEAVE_REQUEST" ? (
                          <Plane className="w-4 h-4" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(activity.date),
                            "dd MMM yyyy, HH:mm",
                          )}{" "}
                          • {activity.details}
                        </p>
                      </div>
                      <Badge
                        variant={
                          (activity.status === "APPROVED"
                            ? "success"
                            : activity.status === "REJECTED"
                              ? "destructive"
                              : "secondary") as any
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-60">
                  <div className="p-4 rounded-full bg-secondary mb-3">
                    <Clock className="w-8 h-8" />
                  </div>
                  <p>{t("noRecentActivity")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
