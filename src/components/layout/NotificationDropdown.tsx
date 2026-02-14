"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export function NotificationDropdown() {
  const t = useTranslations("Header"); // Assuming 'notifications' key exists here
  const { data: session } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = async () => {
    if (!session?.user?.accessToken) return;

    try {
      // NOTE: We need to ensure API_ENDPOINTS has notifications endpoint
      // for now hardcoding or assuming /api/notifications
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/notifications`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );

      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000); // Poll every minute
    return () => clearInterval(interval);
  }, [session]);

  const markAsRead = async (id: string, link?: string) => {
    if (!session?.user?.accessToken) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/notifications/${id}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );

      // Optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      if (link) {
        setIsOpen(false);
        router.push(link);
      }
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const markAllAsRead = async () => {
    if (!session?.user?.accessToken) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/notifications/all/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );

      // Optimistic update
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 border border-background"></span>
            </span>
          )}
          <span className="sr-only">{t("notifications")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 mt-2 rounded-2xl shadow-xl border-border/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-0"
        forceMount
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <DropdownMenuLabel className="font-bold text-sm m-0 p-0">
            {t("notifications")}
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto text-xs text-amber-600 hover:text-amber-700 p-0 hover:bg-transparent"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>

        <div className="max-h-[300px] overflow-y-auto py-1">
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No new notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`px-4 py-3 cursor-pointer items-start gap-3 focus:bg-amber-50 dark:focus:bg-amber-900/10 ${!notification.isRead ? "bg-amber-50/50 dark:bg-amber-900/5" : ""}`}
                onClick={() => markAsRead(notification.id, notification.link)}
              >
                <div
                  className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${!notification.isRead ? "bg-amber-500" : "bg-transparent"}`}
                />
                <div className="flex-1 space-y-1">
                  <p
                    className={`text-sm leading-none ${!notification.isRead ? "font-semibold text-foreground" : "font-medium text-muted-foreground"}`}
                  >
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70">
                    {new Date(notification.createdAt).toLocaleDateString()}{" "}
                    {new Date(notification.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-2 border-t border-border/50">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs h-8"
              asChild
            >
              <Link href="/notifications">View all notifications</Link>
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
