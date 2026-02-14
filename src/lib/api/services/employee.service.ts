import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  buildQueryString,
} from "../client";
import type { Employee, CreateEmployeeData, APIResponse } from "../types";

// Helper to map snake_case to camelCase
function transformEmployee(data: any): Employee {
  return {
    ...data,
    id: data.id,
    employeeId: data.employee_code || data.employeeId,
    // Names
    firstNameTh: data.first_name_th,
    lastNameTh: data.last_name_th,
    prefixTh: data.prefix_th,
    firstNameEn: data.first_name_en,
    lastNameEn: data.last_name_en,
    prefixEn: data.prefix_en,
    nickname: data.nickname, // same

    // Compat
    firstName: data.first_name_en || data.first_name_th || "",
    lastName: data.last_name_en || data.last_name_th || "",

    // IDs
    idCard: data.national_id || data.idCard,
    passportNo: data.passport_no,

    // Contact
    mobile: data.phone_mobile,
    phonePersonal: data.phone_personal,
    emailPersonal: data.email_personal,
    emailCompany: data.email_company,
    lineId: data.line_id,
    address: data.current_address || data.address,

    // Work
    companyId: data.company_id,
    departmentId: data.department_id,
    unitId: data.unit_id,
    positionIds: data.position_ids, // check if backend returns this
    joinDate: data.hire_date ? new Date(data.hire_date) : new Date(),

    // Relations (if included)
    department: data.Department, // Sequelize "as" alias?
    // Controller: { model: db.Department, as: 'Department' } -> returns property "Department"
    // But standard JSON usually lowercases? Sequelize default is model name.
    // Let's assume it matches the "as" alias exactly: "Department"
    // But frontend type expects "department" (lowercase)
    company: data.Company,
    unit: data.Unit,
    positions: data.Position
      ? Array.isArray(data.Position)
        ? data.Position
        : [data.Position]
      : [],

    // Meta
    status: data.status,
    createdAt: data.created_at ? new Date(data.created_at) : undefined,
    updatedAt: data.updated_at ? new Date(data.updated_at) : undefined,
  };
}

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
  const response = await apiGet<any>(`/employees${queryString}`, {
    token: params.token,
  });

  // Backend returns { data: [], total: ... }
  const rawEmployees = response.data || [];
  const total = response.total || 0;

  const employees = Array.isArray(rawEmployees)
    ? rawEmployees.map(transformEmployee)
    : [];

  return {
    employees,
    total: total,
    page: response.page || params.page || 1,
    pageSize: response.pageSize || params.pageSize || 10,
    totalPages:
      response.totalPages || Math.ceil(total / (params.pageSize || 10)),
  };
}

/**
 * Get single employee by ID
 */
export async function getEmployee(
  id: string,
  token?: string,
): Promise<Employee> {
  const data = await apiGet<any>(`/employees/${id}`, { token });
  return transformEmployee(data);
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
