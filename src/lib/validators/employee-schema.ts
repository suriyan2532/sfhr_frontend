import { z } from "zod";
import { EmpStatus } from "@/lib/api/types";

export const employeeSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  prefixTh: z.string().optional(),
  firstNameTh: z.string().min(1, "First Name (TH) is required"),
  lastNameTh: z.string().min(1, "Last Name (TH) is required"),
  prefixEn: z.string().optional(),
  firstNameEn: z.string().min(1, "First Name (EN) is required"),
  lastNameEn: z.string().min(1, "Last Name (EN) is required"),
  nickname: z.string().optional(),
  // Derived fields for compatibility
  firstName: z.string().optional(),
  lastName: z.string().optional(),

  // Files
  photo: z.any().optional(),
  document: z.any().optional(),

  // Personal Info
  idCard: z
    .string()
    .length(13, "ID Card must be 13 digits")
    .regex(/^\d+$/, "ID Card must be numbers only"),
  passportNo: z.string().optional(),
  nationalityId: z.number().optional(),
  religionId: z.number().optional(),
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
  emailPersonal: z.string().email("Invalid email").optional().or(z.literal("")),
  emailCompany: z.string().email("Invalid email").optional().or(z.literal("")),
  phonePersonal: z.string().optional(),

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
