/**
 * Leave API Service
 *
 * Service functions for leave-related API calls
 */

import { apiGet } from "../client";
import type { LeaveSummary } from "../types";

/**
 * Get leave summary for current user
 * Includes quotas and recent leave requests
 */
export async function getLeaveSummary(): Promise<LeaveSummary> {
  return apiGet<LeaveSummary>("/leaves/summary");
}
