"use server";

// TODO: Migrate to API calls
// This file has been temporarily stubbed out to remove Prisma dependency

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as organizationService from "@/lib/api/services/organization.service";

// Companies
export async function getCompanies(
  query: string = "",
  currentPage: number = 1,
) {
  try {
    const result = await organizationService.getCompanies({
      query,
      page: currentPage,
    });
    return {
      companies: result.companies,
      totalPages: Math.ceil(result.total / 10),
    };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return { companies: [], totalPages: 0 };
  }
}

export async function createCompany(formData: FormData) {
  try {
    const data = {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      taxId: formData.get("taxId") as string,
    };
    await organizationService.createCompany(data);
    revalidatePath("/organization");
    return { message: "Company created successfully" };
  } catch (error) {
    console.error("Error creating company:", error);
    return { message: "Failed to create company" };
  }
}

export async function updateCompany(id: string, formData: FormData) {
  try {
    const data = {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      taxId: formData.get("taxId") as string,
    };
    await organizationService.updateCompany(id, data);
    revalidatePath("/organization");
    return { message: "Company updated successfully" };
  } catch (error) {
    console.error("Error updating company:", error);
    return { message: "Failed to update company" };
  }
}

export async function deleteCompany(id: string) {
  try {
    await organizationService.deleteCompany(id);
    revalidatePath("/organization");
  } catch (error) {
    console.error("Error deleting company:", error);
  }
}

// Units
export async function getUnits() {
  try {
    const result = await organizationService.getUnits();
    return result.units;
  } catch (error) {
    console.error("Error fetching units:", error);
    return [];
  }
}

export async function createUnit(formData: FormData) {
  return { message: "Feature temporarily disabled" };
}

export async function updateUnit(id: string, formData: FormData) {
  return { message: "Feature temporarily disabled" };
}

export async function deleteUnit(id: string) {
  revalidatePath("/organization");
}

// Departments
export async function getDepartments() {
  try {
    const result = await organizationService.getDepartments();
    return result.departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}

export async function createDepartment(formData: FormData) {
  return { message: "Feature temporarily disabled" };
}

export async function updateDepartment(id: string, formData: FormData) {
  return { message: "Feature temporarily disabled" };
}

export async function deleteDepartment(id: string) {
  revalidatePath("/organization");
}

// Positions
export async function getPositions() {
  try {
    const result = await organizationService.getPositions();
    return result.positions;
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
}

export async function createPosition(formData: FormData) {
  return { message: "Feature temporarily disabled" };
}

export async function updatePosition(id: string, formData: FormData) {
  return { message: "Feature temporarily disabled" };
}

export async function deletePosition(id: string) {
  revalidatePath("/organization");
}
