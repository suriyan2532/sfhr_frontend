import { UserPlus, CalendarCheck, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Activity {
  type: "JOIN" | "LEAVE";
  title: string;
  description: string;
  time: Date;
}

export function ActivityList({ activities }: { activities: Activity[] }) {
  const t = useTranslations("Dashboard");
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          {t("sections.recentActivity")}
        </CardTitle>
        <Badge variant="secondary">{activities.length} New</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="group flex gap-4 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-default"
            >
              <div
                className={`mt-1 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  activity.type === "JOIN"
                    ? "bg-success/10 text-success border-success/20 group-hover:scale-110"
                    : "bg-primary/10 text-primary border-primary/20 group-hover:scale-110"
                }`}
              >
                {activity.type === "JOIN" ? (
                  <UserPlus className="h-5 w-5" />
                ) : (
                  <CalendarCheck className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-md">
                    <Clock className="h-3 w-3" />
                    <span>{activity.time.toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <p className="text-sm text-muted-foreground">
                No recent activities
              </p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          className="w-full mt-2 text-muted-foreground hover:text-primary"
        >
          {t("actions.viewAllActivity") || "View All Activity"}
        </Button>
      </CardContent>
    </Card>
  );
}
