"use server";

import { prisma } from "@/lib/prisma";
import { employeeSchema } from "@/lib/validators/employee-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getEmployees(query: string, currentPage: number = 1) {
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  try {
    // TODO: Fix Prisma schema mismatch with remote database
    // Temporarily returning empty data to unblock the page
    console.warn("Employee data temporarily disabled due to schema mismatch");

    return {
      employees: [],
      totalCount: 0,
      totalPages: 0,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch employees.");
  }
}

export async function createEmployee(formData: FormData) {
  // Extract raw data from FormData
  const rawData = Object.fromEntries(formData.entries()) as unknown as Record<
    string,
    unknown
  >;
  // Handle multiple positionIds
  rawData.positionIds = formData.getAll("positionIds");

  // Validate fields using Zod
  const validatedFields = employeeSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Employee.",
    };
  }

  const { data } = validatedFields;
  const { positionIds } = data;

  try {
    // 1. Handle Person (Find or Create)
    let person = await prisma.person.findUnique({
      where: { idCard: data.idCard },
    });

    if (!person) {
      person = await prisma.person.create({
        data: {
          idCard: data.idCard,
          prefix: data.prefix,
          firstName: data.firstName,
          lastName: data.lastName,
          nickname: data.nickname,
          birthDate: data.birthDate,
          gender: data.gender,
          maritalStatus: data.maritalStatus,
          address: data.address,
          mobile: data.mobile,
          lineId: data.lineId,
        },
      });
    }

    // 2. Create Employee
    const employee = await prisma.employee.create({
      data: {
        employeeId: data.employeeId,
        personId: person.id,
        companyId: data.companyId,
        unitId: data.unitId,
        departmentId: data.departmentId,
        workingShiftId: data.workingShiftId,
        joinDate: data.joinDate,
        status: data.status,
      },
    });

    // 3. Create Position assignments
    await prisma.employeePosition.createMany({
      data: positionIds.map((pid, index) => ({
        employeeId: employee.id,
        positionId: pid,
        isPrimary: index === 0, // Assume first one is primary for now
      })),
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Create Employee.",
    };
  }

  revalidatePath("/employees");
  redirect("/employees");
}

export async function deleteEmployee(id: string) {
  try {
    await prisma.employee.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
    revalidatePath("/employees");
    return { message: "Deleted Employee." };
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Delete Employee." };
  }
}
