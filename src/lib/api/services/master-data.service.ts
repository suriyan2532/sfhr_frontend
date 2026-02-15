import { apiGet } from "../client";
import { SelectOption } from "../types";

/**
 * Get shifts for select dropdown
 */
export async function getShiftsForSelect(
  token?: string,
): Promise<SelectOption[]> {
  return apiGet<SelectOption[]>("/master/shifts/select", { token });
}

/**
 * Get employee types for select dropdown
 */
export async function getEmployeeTypesForSelect(
  token?: string,
): Promise<SelectOption[]> {
  return apiGet<SelectOption[]>("/master/employee-types/select", { token });
}

/**
 * Get roles for select dropdown
 */
export async function getRolesForSelect(
  token?: string,
): Promise<SelectOption[]> {
  return apiGet<SelectOption[]>("/master/roles/select", { token });
}

/**
 * Get work types for select dropdown
 */
export async function getWorkTypesForSelect(
  token?: string,
): Promise<SelectOption[]> {
  return apiGet<SelectOption[]>("/master/work-types/select", { token });
}
