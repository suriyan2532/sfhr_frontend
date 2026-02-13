"use server";

// TODO: Migrate to API calls
// This file has been temporarily stubbed out to remove Prisma dependency

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
