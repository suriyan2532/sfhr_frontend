import { z } from 'zod';

export const companySchema = z.object({
  code: z.string().min(1, 'Company Code is required'),
  name: z.string().min(1, 'Company Name is required'),
  taxId: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  parentId: z.string().optional().nullable(),
});

export type CompanyFormValues = z.infer<typeof companySchema>;

export const unitSchema = z.object({
  code: z.string().min(1, 'Unit Code is required'),
  name: z.string().min(1, 'Unit Name is required'),
  companyId: z.string().min(1, 'Company is required'),
});

export type UnitFormValues = z.infer<typeof unitSchema>;

export const departmentSchema = z.object({
  code: z.string().min(1, 'Department Code is required'),
  name: z.string().min(1, 'Department Name is required'),
  companyId: z.string().min(1, 'Company is required'),
  unitId: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;

export const positionSchema = z.object({
  code: z.string().optional(),
  title: z.string().min(1, 'Position Title is required'),
  level: z.preprocess((val) => (val === "" || val === null ? null : typeof val === 'string' ? parseInt(val, 10) : val), z.number().nullable().optional()),
  departmentId: z.string().min(1, 'Department is required'),
});

export type PositionFormValues = z.infer<typeof positionSchema>;
