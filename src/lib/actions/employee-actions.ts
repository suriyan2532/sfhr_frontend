"use server";

import { employeeSchema } from "@/lib/validators/employee-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as employeeService from "@/lib/api/services/employee.service";
import { APIError } from "@/lib/api/client";
import { auth } from "@/auth";

export async function getEmployees(
  query: string,
  currentPage: number = 1,
  companyId?: string,
  departmentId?: string,
  positionId?: string,
) {
  try {
    const session = await auth();
    const token = session?.user?.accessToken;

    const result = await employeeService.getEmployees({
      query,
      page: currentPage,
      pageSize: 10,
      token,
      companyId,
      departmentId,
      positionId,
    });

    return {
      employees: result.employees,
      totalCount: result.total,
      totalPages: result.totalPages,
    };
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof APIError) {
      throw new Error(`Failed to fetch employees: ${error.message}`);
    }
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

  try {
    const session = await auth();
    const token = session?.user?.accessToken;
    await employeeService.createEmployee(data, token);
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof APIError) {
      return {
        message: `API Error: ${error.message}`,
      };
    }
    return {
      message: "API Error: Failed to Create Employee.",
    };
  }

  revalidatePath("/employees");
  redirect("/employees");
}

export async function deleteEmployee(id: string) {
  try {
    const session = await auth();
    const token = session?.user?.accessToken;
    await employeeService.deleteEmployee(id, token);
    revalidatePath("/employees");
    return { message: "Deleted Employee." };
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof APIError) {
      return { message: `API Error: ${error.message}` };
    }
    return { message: "API Error: Failed to Delete Employee." };
  }
}
