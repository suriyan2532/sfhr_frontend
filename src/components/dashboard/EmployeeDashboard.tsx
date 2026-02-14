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
  CheckCircle2,
  XCircle,
  Plane,
  Stethoscope,
  PartyPopper,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import {
  format,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
} from "date-fns";

interface Profile {
  fullName: string;
  position: string;
  department: string;
  employeeCode: string;
  startDate?: string;
  avatar?: string;
}

interface LeaveQuota {
  name: string;
  total: number;
  used: number;
  remaining: number;
}

interface AttendanceStats {
  totalWorkingDays: number;
  present: number;
  late: number;
  absent: number;
  leave: number;
}

interface Activity {
  type: string;
  title: string;
  date: string;
  status: string;
  details: string;
}

interface ShiftInfo {
  name: string;
  time: string;
  workDays: string;
}

interface Holiday {
  date: string;
  name: string;
  type: string;
}

interface CalendarEvent {
  date: string;
  type: "ATTENDANCE" | "HOLIDAY";
  status?: string;
  name?: string;
}

interface EmployeeDashboardProps {
  data: {
    profile: Profile;
    leaveQuotas: LeaveQuota[];
    attendanceStats: AttendanceStats;
    activities: Activity[];
    shiftInfo: ShiftInfo | null;
    holidays: Holiday[];
    calendarEvents: CalendarEvent[];
  };
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

  const {
    profile,
    leaveQuotas,
    attendanceStats,
    activities,
    shiftInfo,
    holidays,
    calendarEvents,
  } = data;

  // Helper to determine greeting
  const hour = new Date().getHours();
  let greetingKey = "goodMorning";
  if (hour >= 12 && hour < 17) greetingKey = "goodAfternoon";
  else if (hour >= 17) greetingKey = "goodEvening";

  // Simple Calendar Generation
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 1. Profile & Personal Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome / Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <Card className="h-full bg-linear-to-br from-indigo-600 to-purple-700 text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
              <Briefcase className="w-64 h-64" />
            </div>
            <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-28 w-28 border-4 border-white/20 shadow-lg shrink-0">
                <AvatarImage src={profile.avatar} className="object-cover" />
                <AvatarFallback className="text-3xl font-bold bg-white/10 text-white backdrop-blur-md">
                  {profile.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-3 flex-1">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {t(greetingKey as any)}, {profile.fullName}
                  </h1>
                  <p className="text-indigo-100 opacity-90 mt-1">
                    {t("welcomeBackMessage")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-indigo-100">
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{profile.position}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <User className="w-3.5 h-3.5" />
                    <span>{profile.department}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Since{" "}
                      {profile.startDate
                        ? format(new Date(profile.startDate), "MMM yyyy")
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shift / Today's Schedule Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full border-l-4 border-l-amber-500 shadow-md flex flex-col justify-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                {t("currentShift")} & Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              {shiftInfo ? (
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                      Today&apos;s Shift
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      {shiftInfo.time}
                    </span>
                    <span className="text-amber-600 font-medium">
                      {shiftInfo.name}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold block">
                      Work Days
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <span
                            key={day}
                            className={`text-xs px-2 py-1 rounded-md ${
                              shiftInfo.workDays.includes(day)
                                ? "bg-amber-100 text-amber-700 font-medium"
                                : "text-muted-foreground bg-gray-100"
                            }`}
                          >
                            {day}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <CalendarDays className="w-10 h-10 mb-2 opacity-50" />
                  <p>{t("noShiftAssigned")}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 2. Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: t("totalWorkingDays"),
            value: attendanceStats.totalWorkingDays,
            icon: Briefcase,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
          },
          {
            label: t("present"),
            value: attendanceStats.present,
            icon: CheckCircle2,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
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
            color: "text-rose-500",
            bg: "bg-rose-500/10",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow cursor-default border-none bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-1 text-zinc-800 dark:text-zinc-100">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. Leave Quotas & Holidays (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quotas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-sky-500" />
                    {t("leaveQuotas")}
                  </CardTitle>
                  <CardDescription>
                    {t("leaveQuotaDescription")}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/leaves">My Requests</Link>
                </Button>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                {leaveQuotas.map((quota: LeaveQuota, i: number) => {
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
                    ? "bg-rose-500"
                    : quota.name.includes("Vacation")
                      ? "bg-sky-500"
                      : "bg-amber-500";
                  const textClass = colorClass.replace("bg-", "text-");

                  return (
                    <div
                      key={i}
                      className="bg-secondary/30 p-4 rounded-xl space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}
                          >
                            <Icon className={`w-5 h-5 ${textClass}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {quota.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {quota.total} Days Total
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xl font-bold ${textClass}`}>
                            {quota.remaining}
                          </span>
                          <p className="text-[10px] uppercase text-muted-foreground font-semibold">
                            Remaining
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Used: {quota.used}</span>
                          <span>{Math.round(percentage)}%</span>
                        </div>
                        <Progress
                          value={percentage}
                          className="h-1.5"
                          indicatorColor={colorClass}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Public Holidays */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PartyPopper className="w-5 h-5 text-pink-500" />
                  Public Holidays ({new Date().getFullYear()})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {holidays && holidays.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {holidays.map((holiday: Holiday, i: number) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          new Date(holiday.date) < new Date()
                            ? "bg-gray-50 opacity-60"
                            : "bg-white hover:border-pink-200 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex-col flex items-center justify-center w-10 h-10 rounded-lg bg-pink-50 text-pink-600 shrink-0">
                          <span className="text-xs font-bold uppercase">
                            {format(new Date(holiday.date), "MMM")}
                          </span>
                          <span className="text-sm font-black leading-none">
                            {format(new Date(holiday.date), "dd")}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {holiday.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(holiday.date), "EEEE")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No holidays found for this year.
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 4. Right Column: Calendar & Activities */}
        <div className="space-y-6">
          {/* Mini Calendar View */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{format(today, "MMMM yyyy")}</span>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} className="text-muted-foreground font-medium">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {daysInMonth.map((day) => {
                    const isTodayDate = isToday(day);

                    // Check events
                    const dayEvents =
                      calendarEvents?.filter((e: CalendarEvent) =>
                        isSameDay(new Date(e.date), day),
                      ) || [];
                    const isHoliday = dayEvents.some(
                      (e: CalendarEvent) => e.type === "HOLIDAY",
                    );
                    const attendance = dayEvents.find(
                      (e: CalendarEvent) => e.type === "ATTENDANCE",
                    );

                    let bgClass = "hover:bg-accent cursor-pointer";
                    if (isTodayDate)
                      bgClass =
                        "bg-indigo-600 text-white font-bold hover:bg-indigo-700";
                    else if (isHoliday)
                      bgClass = "bg-pink-100 text-pink-700 font-medium";
                    else if (attendance) {
                      if (attendance.status === "PRESENT")
                        bgClass = "bg-green-100 text-green-700";
                      else if (attendance.status === "LATE")
                        bgClass = "bg-amber-100 text-amber-700";
                      else if (attendance.status === "ABSENT")
                        bgClass = "bg-red-100 text-red-700";
                    }

                    return (
                      <div
                        key={day.toISOString()}
                        className={`aspect-square flex items-center justify-center rounded-md transition-colors ${bgClass}`}
                      >
                        {format(day, "d")}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 justify-center text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Present
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    Late
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                    Holiday
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="flex flex-col h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  {activities.map((act: Activity, i: number) => (
                    <div key={i} className="flex gap-3 relative pb-4 last:pb-0">
                      {i !== activities.length - 1 && (
                        <div className="absolute left-2.5 top-8 bottom-0 w-0.5 bg-gray-100 dark:bg-zinc-800" />
                      )}
                      <div
                        className={`shrink-0 w-5 h-5 rounded-full mt-1 flex items-center justify-center z-10 ${
                          act.status === "APPROVED"
                            ? "bg-green-100 text-green-600"
                            : act.status === "REJECTED"
                              ? "bg-red-100 text-red-600"
                              : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {act.type === "LEAVE_REQUEST" ? (
                          <Plane className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{act.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(act.date), "dd MMM")} • {act.details}
                        </p>
                        <Badge
                          variant={
                            act.status === "APPROVED" ? "success" : "secondary"
                          }
                          className="mt-1 text-[10px] h-5 px-1.5"
                        >
                          {act.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <p className="text-sm text-center text-muted-foreground py-4">
                      No recent activity
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
