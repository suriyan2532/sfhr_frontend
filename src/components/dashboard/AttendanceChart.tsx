"use client";

import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ChartData {
  date: string;
  fullDate: string;
  count: number;
}

export function AttendanceChart({ data }: { data: ChartData[] }) {
  const t = useTranslations("Dashboard");
  const maxVal = Math.max(...data.map((d) => d.count), 1);

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          {t("sections.attendanceTrend")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-48 gap-2">
          {data.map((d, i) => {
            const height = (d.count / maxVal) * 100;
            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div className="relative w-full h-full flex items-end justify-center">
                  {/* Bar */}
                  <div
                    className="w-full max-w-[32px] bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary/80 cursor-pointer"
                    style={{ height: `${height}%` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded border shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {d.count} Employees
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {d.date}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
