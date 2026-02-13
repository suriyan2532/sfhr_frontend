"use server";

import { prisma } from "@/lib/prisma";
import {
  companySchema,
  unitSchema,
  departmentSchema,
  positionSchema,
} from "@/lib/validators/organization-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getCompanies(
  query: string = "",
  currentPage: number = 1,
) {
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  try {
    const companies = await prisma.company.findMany({
      where: {
        isDeleted: false,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        parent: true,
        _count: {
          select: { departments: true, employees: true },
        },
      },
      orderBy: { name: "asc" },
      skip,
      take: pageSize,
    });

    const totalCount = await prisma.company.count({
      where: {
        isDeleted: false,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    return {
      companies,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  } catch (error) {
    console.error("Failed to fetch companies:", error);
    throw new Error("Failed to fetch companies");
  }
}

export async function getAllCompaniesForSelect() {
  return await prisma.company.findMany({
    where: { isDeleted: false },
    orderBy: { name: "asc" },
    select: { id: true, name: true, code: true },
  });
}

export async function createCompany(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = companySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Company.",
    };
  }

  const { data } = validatedFields;

  // Check duplicate code
  const existing = await prisma.company.findUnique({
    where: { code: data.code },
  });

  if (existing) {
    return { message: "Company Code already exists." };
  }

  try {
    await prisma.company.create({
      data: {
        code: data.code,
        name: data.name,
        taxId: data.taxId,
        address: data.address,
        phone: data.phone,
        parentId: data.parentId || null,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Create Company." };
  }

  revalidatePath("/organization");
  redirect("/organization");
}

export async function updateCompany(id: string, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = companySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Company.",
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.company.update({
      where: { id },
      data: {
        code: data.code,
        name: data.name,
        taxId: data.taxId,
        address: data.address,
        phone: data.phone,
        parentId: data.parentId || null,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Update Company." };
  }

  revalidatePath("/organization");
  redirect("/organization");
}

export async function deleteCompany(id: string) {
  try {
    await prisma.company.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
    revalidatePath("/organization");
    revalidatePath("/settings/master/company"); // Revalidate both
    return { message: "Deleted Company." };
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Failed to Delete Company." };
  }
}

// UNIT ACTIONS
export async function getUnits(query: string = "", currentPage: number = 1) {
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  try {
    const units = await prisma.unit.findMany({
      where: {
        isDeleted: false,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { company: true },
      orderBy: { name: "asc" },
      skip,
      take: pageSize,
    });

    const totalCount = await prisma.unit.count({
      where: {
        isDeleted: false,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    return { units, totalCount, totalPages: Math.ceil(totalCount / pageSize) };
  } catch (error) {
    console.error("Failed to fetch units:", error);
    throw new Error("Failed to fetch units");
  }
}

export async function createUnit(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = unitSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.unit.create({
      data: {
        code: data.code,
        name: data.name,
        companyId: data.companyId,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Create Unit." };
  }

  revalidatePath("/settings/master/unit");
  redirect("/settings/master/unit");
}

export async function deleteUnit(id: string) {
  try {
    await prisma.unit.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
    revalidatePath("/settings/master/unit");
    return { message: "Deleted Unit." };
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Failed to Delete Unit." };
  }
}

// DEPARTMENT ACTIONS
export async function getDepartments(
  query: string = "",
  currentPage: number = 1,
) {
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  try {
    const departments = await prisma.department.findMany({
      where: {
        isDeleted: false,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { company: true, unit: true, parent: true },
      orderBy: { name: "asc" },
      skip,
      take: pageSize,
    });

    const totalCount = await prisma.department.count({
      where: {
        isDeleted: false,
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    return {
      departments,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch departments");
  }
}

export async function createDepartment(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = departmentSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.department.create({
      data: {
        code: data.code,
        name: data.name,
        companyId: data.companyId,
        unitId: data.unitId || null,
        parentId: data.parentId || null,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Failed to Create Department." };
  }

  revalidatePath("/settings/master/department");
  redirect("/settings/master/department");
}

export async function deleteDepartment(id: string) {
  try {
    await prisma.department.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
    revalidatePath("/settings/master/department");
    return { message: "Deleted Department." };
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Failed to Delete Department." };
  }
}

// POSITION ACTIONS
export async function getPositions(
  query: string = "",
  currentPage: number = 1,
) {
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  try {
    const positions = await prisma.position.findMany({
      where: {
        isDeleted: false,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { department: true },
      orderBy: { title: "asc" },
      skip,
      take: pageSize,
    });

    const totalCount = await prisma.position.count({
      where: {
        isDeleted: false,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { code: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    return {
      positions,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch positions");
  }
}

export async function createPosition(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = positionSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  const { data } = validatedFields;

  try {
    await prisma.position.create({
      data: {
        title: data.title,
        code: data.code || null,
        level: data.level || null,
        departmentId: data.departmentId,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Failed to Create Position." };
  }

  revalidatePath("/settings/master/position");
  redirect("/settings/master/position");
}

export async function deletePosition(id: string) {
  try {
    await prisma.position.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
    revalidatePath("/settings/master/position");
    return { message: "Deleted Position." };
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Failed to Delete Position." };
  }
}

// SELECT FETCHERS
export async function getAllUnitsForSelect() {
  return await prisma.unit.findMany({
    where: { isDeleted: false },
    orderBy: { name: "asc" },
    select: { id: true, name: true, code: true },
  });
}

export async function getAllDepartmentsForSelect() {
  return await prisma.department.findMany({
    where: { isDeleted: false },
    orderBy: { name: "asc" },
    select: { id: true, name: true, code: true },
  });
}
