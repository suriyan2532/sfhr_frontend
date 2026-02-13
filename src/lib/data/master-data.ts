// TODO: Migrate to API calls
// This file has been temporarily stubbed out to remove Prisma dependency
// Use the API services instead: organizationService

import * as organizationService from "@/lib/api/services/organization.service";

export async function getDepartments() {
  const result = await organizationService.getDepartments();
  return result.departments;
}

export async function getPositions() {
  const result = await organizationService.getPositions();
  return result.positions;
}

export async function getCompanies() {
  const result = await organizationService.getCompanies();
  return result.companies;
}

export async function getUnits() {
  const result = await organizationService.getUnits();
  return result.units;
}

export async function getWorkingShifts() {
  // TODO: Add WorkingShift to API types and backend
  return [];
}
