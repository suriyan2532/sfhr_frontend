/**
 * Organization API Service
 *
 * Service functions for organization-related API calls
 * (Companies, Units, Departments, Positions)
 */

import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  buildQueryString,
} from "../client";
import type {
  Company,
  Unit,
  Department,
  Position,
  SelectOption,
  APIResponse,
} from "../types";

// ============================================================================
// Companies
// ============================================================================

export interface GetCompaniesParams {
  query?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Get list of companies
 */
export async function getCompanies(
  params: GetCompaniesParams = {},
  token?: string,
): Promise<{ companies: Company[]; total: number }> {
  const queryString = buildQueryString(params as Record<string, unknown>);
  const response = await apiGet<Company[]>(`/companies${queryString}`, {
    token,
  });

  return {
    companies: Array.isArray(response) ? response : [],
    total: Array.isArray(response) ? response.length : 0,
  };
}

/**
 * Get companies for select dropdown
 */
export async function getCompaniesForSelect(
  token?: string,
): Promise<SelectOption[]> {
  return apiGet<SelectOption[]>("/companies/select", { token });
}

/**
 * Get single company by ID
 */
export async function getCompany(id: string): Promise<Company> {
  return apiGet<Company>(`/companies/${id}`);
}

/**
 * Create new company
 */
export async function createCompany(
  data: Omit<Company, "id" | "createdAt" | "updatedAt">,
): Promise<APIResponse<Company>> {
  return apiPost<APIResponse<Company>>("/companies", data);
}

/**
 * Update existing company
 */
export async function updateCompany(
  id: string,
  data: Partial<Omit<Company, "id" | "createdAt" | "updatedAt">>,
): Promise<APIResponse<Company>> {
  return apiPut<APIResponse<Company>>(`/companies/${id}`, data);
}

/**
 * Delete company
 */
export async function deleteCompany(id: string): Promise<APIResponse<void>> {
  return apiDelete<APIResponse<void>>(`/companies/${id}`);
}

// ============================================================================
// Units
// ============================================================================

export interface GetUnitsParams {
  companyId?: string;
  query?: string;
}

/**
 * Get list of units
 */
export async function getUnits(
  params: GetUnitsParams = {},
  token?: string,
): Promise<{ units: Unit[]; total: number }> {
  const queryString = buildQueryString(params as Record<string, unknown>);
  const response = await apiGet<Unit[]>(`/units${queryString}`, { token });

  return {
    units: Array.isArray(response) ? response : [],
    total: Array.isArray(response) ? response.length : 0,
  };
}

/**
 * Get units for select dropdown
 */
export async function getUnitsForSelect(
  companyId?: string,
  token?: string,
): Promise<SelectOption[]> {
  const queryString = companyId ? buildQueryString({ companyId }) : "";
  return apiGet<SelectOption[]>(`/units/select${queryString}`, { token });
}

/**
 * Create new unit
 */
export async function createUnit(
  data: Omit<Unit, "id" | "createdAt" | "updatedAt" | "company">,
): Promise<APIResponse<Unit>> {
  return apiPost<APIResponse<Unit>>("/units", data);
}

/**
 * Update existing unit
 */
export async function updateUnit(
  id: string,
  data: Partial<Omit<Unit, "id" | "createdAt" | "updatedAt" | "company">>,
): Promise<APIResponse<Unit>> {
  return apiPut<APIResponse<Unit>>(`/units/${id}`, data);
}

/**
 * Delete unit
 */
export async function deleteUnit(id: string): Promise<APIResponse<void>> {
  return apiDelete<APIResponse<void>>(`/units/${id}`);
}

// ============================================================================
// Departments
// ============================================================================

export interface GetDepartmentsParams {
  companyId?: string;
  unitId?: string;
  query?: string;
}

/**
 * Get list of departments
 */
export async function getDepartments(
  params: GetDepartmentsParams = {},
  token?: string,
): Promise<{ departments: Department[]; total: number }> {
  const queryString = buildQueryString(params as Record<string, unknown>);
  const response = await apiGet<Department[]>(`/departments${queryString}`, {
    token,
  });

  return {
    departments: Array.isArray(response) ? response : [],
    total: Array.isArray(response) ? response.length : 0,
  };
}

/**
 * Get departments for select dropdown
 */
export async function getDepartmentsForSelect(
  companyId?: string,
  token?: string,
): Promise<SelectOption[]> {
  const queryString = companyId ? buildQueryString({ companyId }) : "";
  return apiGet<SelectOption[]>(`/departments/select${queryString}`, { token });
}

/**
 * Create new department
 */
export async function createDepartment(
  data: Omit<Department, "id" | "createdAt" | "updatedAt" | "company" | "unit">,
): Promise<APIResponse<Department>> {
  return apiPost<APIResponse<Department>>("/departments", data);
}

/**
 * Update existing department
 */
export async function updateDepartment(
  id: string,
  data: Partial<
    Omit<Department, "id" | "createdAt" | "updatedAt" | "company" | "unit">
  >,
): Promise<APIResponse<Department>> {
  return apiPut<APIResponse<Department>>(`/departments/${id}`, data);
}

/**
 * Delete department
 */
export async function deleteDepartment(id: string): Promise<APIResponse<void>> {
  return apiDelete<APIResponse<void>>(`/departments/${id}`);
}

// ============================================================================
// Positions
// ============================================================================

export interface GetPositionsParams {
  departmentId?: string;
  query?: string;
}

/**
 * Get list of positions
 */
export async function getPositions(
  params: GetPositionsParams = {},
  token?: string,
): Promise<{ positions: Position[]; total: number }> {
  const queryString = buildQueryString(params as Record<string, unknown>);
  const response = await apiGet<Position[]>(`/positions${queryString}`, {
    token,
  });

  return {
    positions: Array.isArray(response) ? response : [],
    total: Array.isArray(response) ? response.length : 0,
  };
}

/**
 * Get positions for select dropdown
 */
export async function getPositionsForSelect(
  departmentId?: string,
  token?: string,
): Promise<SelectOption[]> {
  const queryString = departmentId ? buildQueryString({ departmentId }) : "";
  return apiGet<SelectOption[]>(`/positions/select${queryString}`, { token });
}

/**
 * Create new position
 */
export async function createPosition(
  data: Omit<Position, "id" | "createdAt" | "updatedAt" | "department">,
): Promise<APIResponse<Position>> {
  return apiPost<APIResponse<Position>>("/positions", data);
}

/**
 * Update existing position
 */
export async function updatePosition(
  id: string,
  data: Partial<
    Omit<Position, "id" | "createdAt" | "updatedAt" | "department">
  >,
): Promise<APIResponse<Position>> {
  return apiPut<APIResponse<Position>>(`/positions/${id}`, data);
}

/**
 * Delete position
 */
export async function deletePosition(id: string): Promise<APIResponse<void>> {
  return apiDelete<APIResponse<void>>(`/positions/${id}`);
}
