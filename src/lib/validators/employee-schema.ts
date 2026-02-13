import { z } from "zod";
import { EmpStatus } from "@/lib/api/types";

export const employeeSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  prefix: z.string().optional(),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  nickname: z.string().optional(),

  // Personal Info
  idCard: z
    .string()
    .length(13, "ID Card must be 13 digits")
    .regex(/^\d+$/, "ID Card must be numbers only"),
  birthDate: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val ? new Date(val) : null)), // Handle date string from form
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  maritalStatus: z.string().optional(),
  address: z.string().optional(),
  mobile: z
    .string()
    .regex(/^\d{10}$/, "Mobile must be 10 digits")
    .optional()
    .or(z.literal("")),
  lineId: z.string().optional(),

  // Work Info
  companyId: z.string().min(1, "Company is required"),
  unitId: z.string().optional().nullable(),
  departmentId: z.string().min(1, "Department is required"),
  positionIds: z.array(z.string()).min(1, "At least one position is required"),
  workingShiftId: z.string().optional().nullable(),

  joinDate: z.string().transform((val) => new Date(val)),
  status: z.nativeEnum(EmpStatus).default(EmpStatus.PROBATION),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
