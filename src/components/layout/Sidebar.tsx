"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    // {
    //   label: "Dashboard",
    //   icon: LayoutDashboard,
    //   href: "/dashboard",
    //   active: pathname === "/dashboard",
    // },
    {
      label: "Employees",
      icon: Users,
      href: "/employees",
      active: pathname === "/employees" || pathname.startsWith("/employees"),
    },
    {
      label: "Calendar",
      icon: Calendar,
      href: "/calendar",
      active: pathname === "/calendar",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ];

  return (
    <div className={cn("pb-12 min-h-screen border-r bg-background", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 mb-10 px-4">
            <Hexagon className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold tracking-tight">Safari HR</h2>
          </div>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                  route.active 
                    ? "bg-secondary text-primary" 
                    : "text-muted-foreground hover:bg-secondary/50"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto px-3 py-2 absolute bottom-4 w-full">
         <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
         </Button>
      </div>
    </div>
  );
}
