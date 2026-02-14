// TODO: Migrate to API calls
// This file has been temporarily stubbed out to remove Prisma dependency
// Use the API services instead: organizationService

import * as organizationService from "@/lib/api/services/organization.service";

export async function getDepartments(token?: string) {
  const result = await organizationService.getDepartments({}, token);
  return result.departments;
}

export async function getPositions(token?: string) {
  const result = await organizationService.getPositions({}, token);
  return result.positions;
}

export async function getCompanies(token?: string) {
  const result = await organizationService.getCompanies({}, token);
  return result.companies;
}

export async function getUnits(token?: string) {
  const result = await organizationService.getUnits({}, token);
  return result.units;
}

export async function getWorkingShifts(_token?: string) {
  // TODO: Add WorkingShift to API types and backend
  return [];
}
