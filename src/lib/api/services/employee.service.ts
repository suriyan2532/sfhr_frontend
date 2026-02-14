/**
 * Employee API Service
 *
 * Service functions for employee-related API calls
 */

import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  buildQueryString,
} from "../client";
import type { Employee, CreateEmployeeData, APIResponse } from "../types";

export interface GetEmployeesParams {
  query?: string;
  page?: number;
  pageSize?: number;
  token?: string;
  companyId?: string;
  departmentId?: string;
  positionId?: string;
}

export interface GetEmployeesResponse {
  employees: Employee[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Get list of employees with optional filtering and pagination
 */
export async function getEmployees(
  params: GetEmployeesParams = {},
): Promise<GetEmployeesResponse> {
  const queryString = buildQueryString(params as Record<string, unknown>);
  const response = await apiGet<Employee[]>(`/employees${queryString}`, {
    token: params.token,
  });

  // Backend returns array directly, transform to expected format
  return {
    employees: Array.isArray(response) ? response : [],
    total: Array.isArray(response) ? response.length : 0,
    page: params.page || 1,
    pageSize: params.pageSize || 10,
    totalPages: Math.ceil(
      (Array.isArray(response) ? response.length : 0) / (params.pageSize || 10),
    ),
  };
}

/**
 * Get single employee by ID
 */
export async function getEmployee(
  id: string,
  token?: string,
): Promise<Employee> {
  return apiGet<Employee>(`/employees/${id}`, { token });
}

/**
 * Create new employee
 */
export async function createEmployee(
  data: CreateEmployeeData,
  token?: string,
): Promise<APIResponse<Employee>> {
  return apiPost<APIResponse<Employee>>("/employees", data, { token });
}

/**
 * Update existing employee
 */
export async function updateEmployee(
  id: string,
  data: Partial<CreateEmployeeData>,
  token?: string,
): Promise<APIResponse<Employee>> {
  return apiPut<APIResponse<Employee>>(`/employees/${id}`, data, { token });
}

/**
 * Delete employee (soft delete)
 */
export async function deleteEmployee(
  id: string,
  token?: string,
): Promise<APIResponse<void>> {
  return apiDelete<APIResponse<void>>(`/employees/${id}`, { token });
}
