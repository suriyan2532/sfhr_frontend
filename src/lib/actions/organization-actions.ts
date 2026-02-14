"use server";

// TODO: Migrate to API calls
// This file has been temporarily stubbed out to remove Prisma dependency

import { revalidatePath } from "next/cache";
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
    return {
      message: "Failed to create company",
      errors: { root: [(error as Error).message] },
    };
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
    return {
      message: "Failed to update company",
      errors: { root: [(error as Error).message] },
    };
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

// Helper function for select options
export async function getAllCompaniesForSelect() {
  try {
    const result = await organizationService.getCompanies({ page: 1 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.companies.map((company: any) => ({
      id: company.id,
      name: company.name,
      code: company.code,
    }));
  } catch (error) {
    console.error("Error fetching companies for select:", error);
    return [];
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
  console.log(formData);
  return { message: "Feature temporarily disabled", errors: undefined };
}

export async function updateUnit(id: string, formData: FormData) {
  console.log(id, formData);
  return { message: "Feature temporarily disabled", errors: undefined };
}

export async function deleteUnit(id: string) {
  console.log(id);
  revalidatePath("/organization");
}

// Helper function for select options
export async function getAllUnitsForSelect() {
  try {
    const result = await organizationService.getUnits();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.units.map((unit: any) => ({
      id: unit.id,
      name: unit.name,
      code: unit.code,
    }));
  } catch (error) {
    console.error("Error fetching units for select:", error);
    return [];
  }
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

export async function createDepartment(_formData: FormData) {
  console.log(_formData);
  return { message: "Feature temporarily disabled", errors: undefined };
}

export async function updateDepartment(_id: string, _formData: FormData) {
  console.log(_id, _formData);
  return { message: "Feature temporarily disabled", errors: undefined };
}

export async function deleteDepartment(id: string) {
  console.log(id);
  revalidatePath("/organization");
}

// Helper function for select options
export async function getAllDepartmentsForSelect() {
  try {
    const result = await organizationService.getDepartments();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.departments.map((dept: any) => ({
      id: dept.id,
      name: dept.name,
      code: dept.code,
    }));
  } catch (error) {
    console.error("Error fetching departments for select:", error);
    return [];
  }
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

export async function createPosition(_formData: FormData) {
  console.log(_formData);
  return { message: "Feature temporarily disabled", errors: undefined };
}

export async function updatePosition(_id: string, _formData: FormData) {
  console.log(_id, _formData);
  return { message: "Feature temporarily disabled", errors: undefined };
}

export async function deletePosition(id: string) {
  console.log(id);
  revalidatePath("/organization");
}
