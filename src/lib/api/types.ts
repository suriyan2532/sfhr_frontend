/**
 * TypeScript Type Definitions for Backend API
 *
 * These types match the backend API response structures
 */

// ============================================================================
// Common Types
// ============================================================================

export interface APIResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================================
// Employee Types
// ============================================================================

export enum EmpStatus {
  ACTIVE = "ACTIVE",
  PROBATION = "PROBATION",
  RESIGNED = "RESIGNED",
  TERMINATED = "TERMINATED",
  RETIRED = "RETIRED",
}

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  idCard: string;
  birthDate?: Date | null;
  gender?: string;
  maritalStatus?: string;
  address?: string;
  mobile?: string;
  lineId?: string;
  companyId: string;
  company?: Company;
  unitId?: string | null;
  unit?: Unit;
  departmentId: string;
  department?: Department;
  positionIds?: string[];
  positions?: Position[];
  workingShiftId?: string | null;
  joinDate: Date;
  status: EmpStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateEmployeeData {
  employeeId: string;
  idCard: string;
  prefix?: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  birthDate?: Date | null;
  gender?: string;
  maritalStatus?: string;
  address?: string;
  mobile?: string;
  lineId?: string;
  companyId: string;
  unitId?: string | null;
  departmentId: string;
  positionIds: string[];
  workingShiftId?: string | null;
  joinDate: Date;
  status: EmpStatus;
}

// ============================================================================
// Organization Types
// ============================================================================

export interface Company {
  id: string;
  code: string;
  name: string;
  address?: string;
  phone?: string;
  taxId?: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  code: string;
  name: string;
  companyId: string;
  company?: Company;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  companyId: string;
  company?: Company;
  unitId?: string;
  unit?: Unit;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  code?: string;
  title: string;
  level?: number;
  departmentId: string;
  department?: Department;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Attendance Types
// ============================================================================

export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  LATE = "LATE",
  EARLY_LEAVE = "EARLY_LEAVE",
  LEAVE = "LEAVE",
  HOLIDAY = "HOLIDAY",
  OFF = "OFF",
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  remark?: string;
  isLate: boolean;
  lateMinutes: number;
  isEarlyLeave: boolean;
  earlyMinutes: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Leave Types
// ============================================================================

export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export enum LeaveType {
  SICK = "SICK",
  BUSINESS = "BUSINESS",
  VACATION = "VACATION",
  MATERNITY = "MATERNITY",
  PATERNITY = "PATERNITY",
  UNPAID = "UNPAID",
  OTHER = "OTHER",
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason?: string;
  status: LeaveStatus;
  approverId?: string;
  approvedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveSummary {
  quotas: {
    type: string;
    total: number;
    used: number;
    remaining: number;
  }[];
  recentRequests: LeaveRequest[];
}

// ============================================================================
// Auth Types
// ============================================================================

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
    email?: string;
    role: string;
  };
}

export interface User {
  id: string;
  username: string;
  email?: string;
  role: string;
  isActive: boolean;
  employeeId?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Select Option Types (for dropdowns)
// ============================================================================

export interface SelectOption {
  id: string;
  code: string;
  name: string;
}
