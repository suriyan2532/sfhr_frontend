"use server";

// TODO: Migrate to API calls
// This file has been temporarily stubbed out to remove Prisma dependency

import { API_ENDPOINTS } from "@/lib/api-config";
import { auth } from "@/auth";

export async function getDashboardSummary() {
  // Return empty data until backend API endpoint is available
  return {
    stats: {
      totalEmployees: 0,
      presentToday: 0,
      onLeaveToday: 0,
      pendingApprovals: 0,
    },
    trendData: [],
    activities: { recentEmployees: [], recentLeaves: [] },
  };
}

export async function getEmployeeDashboardData() {
  const session = await auth();
  if (!session?.user?.accessToken) return null;

  try {
    const res = await fetch(API_ENDPOINTS.dashboard.employee, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch employee dashboard data",
        res.status,
        res.statusText,
      );
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching employee dashboard:", error);
    return null;
  }
}

export async function getManagerDashboardData() {
  const session = await auth();
  if (!session?.user?.accessToken) return null;

  try {
    const res = await fetch(API_ENDPOINTS.dashboard.manager, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch manager dashboard data", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching manager dashboard:", error);
    return null;
  }
}

export async function getCompanyDashboardData() {
  const session = await auth();
  if (!session?.user?.accessToken) return null;

  try {
    const res = await fetch(API_ENDPOINTS.dashboard.company, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch company dashboard data", res.status);
      // Fallback to empty structure if failed
      return {
        stats: {
          totalEmployees: 0,
          presentToday: 0,
          onLeaveToday: 0,
          pendingApprovals: 0,
        },
        trendData: [],
        activities: { recentEmployees: [], recentLeaves: [] },
      };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching company dashboard:", error);
    return {
      stats: {
        totalEmployees: 0,
        presentToday: 0,
        onLeaveToday: 0,
        pendingApprovals: 0,
      },
      trendData: [],
      activities: { recentEmployees: [], recentLeaves: [] },
    };
  }
}
