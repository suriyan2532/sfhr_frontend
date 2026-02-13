"use server";

// TODO: Migrate to API calls
// This file has been temporarily stubbed out to remove Prisma dependency

export async function getLeaveRequests() {
  return [];
}

export async function createLeaveRequest() {
  return { success: false, message: "Feature temporarily disabled" };
}

export async function approveLeaveRequest() {
  return { success: false, message: "Feature temporarily disabled" };
}

export async function rejectLeaveRequest() {
  return { success: false, message: "Feature temporarily disabled" };
}

export async function getLeaveSummary() {
  return {
    quotas: [],
    recentRequests: [],
  };
}
