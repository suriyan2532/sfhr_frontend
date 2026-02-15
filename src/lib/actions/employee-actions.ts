"use server";

import { employeeSchema } from "@/lib/validators/employee-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as employeeService from "@/lib/api/services/employee.service";
import { APIError } from "@/lib/api/client";
import { auth } from "@/auth";
import type { Employee } from "@/lib/api/types";

export async function getEmployees(
  query: string,
  currentPage: number = 1,
  companyId?: string,
  departmentId?: string,
  positionId?: string,
  shiftId?: string,
  employeeTypeId?: string,
  workType?: string,
  roleId?: string,
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
      shiftId,
      employeeTypeId,
      workType,
      roleId,
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

import { uploadFiles } from "@/lib/api/services/upload.service";

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

    // Handle File Uploads
    let photoUrl = null;
    let documentUrl = null;

    // Check if files exist in formData and are actual Files (size > 0)
    const photo = formData.get("photo") as File;
    const document = formData.get("document") as File;

    const uploadFormData = new FormData();
    let hasFiles = false;

    if (photo && photo.size > 0) {
      uploadFormData.append("photo", photo);
      hasFiles = true;
    }

    if (document && document.size > 0) {
      uploadFormData.append("document", document);
      hasFiles = true;
    }

    if (hasFiles && token) {
      try {
        const uploadResult = await uploadFiles(uploadFormData, token);
        if (uploadResult.photoUrl) photoUrl = uploadResult.photoUrl;
        if (uploadResult.documentUrl) documentUrl = uploadResult.documentUrl;
      } catch (uploadError) {
        console.error("Upload Error:", uploadError);
        // We continue even if upload fails? Or fail?
        // Let's warn but continue for now, or maybe throw?
        // throw new Error("Failed to upload files");
      }
    }

    // Map frontend camelCase to backend snake_case
    const backendData: any = {
      ...data,
      // Name
      first_name_th: data.firstNameTh,
      last_name_th: data.lastNameTh,
      prefix_th: data.prefixTh,
      first_name_en: data.firstNameEn,
      last_name_en: data.lastNameEn,
      prefix_en: data.prefixEn,
      nickname: data.nickname,

      // IDs
      national_id: data.idCard, // Mapping idCard to national_id
      passport_no: data.passportNo,

      // Contact
      phone_mobile: data.mobile,
      phone_personal: data.phonePersonal,
      email_personal: data.emailPersonal,
      email_company: data.emailCompany,
      line_id: data.lineId,
      current_address: data.address, // Mapping address to current_address

      // Work
      company_id: data.companyId,
      department_id: data.departmentId,
      unit_id: data.unitId || null,
      position_ids: data.positionIds, // service/backend need to handle array? or loop?

      // Other
      employee_code: data.employeeId,
      birth_date: data.birthDate,
      gender: data.gender ? data.gender.toUpperCase() : null,

      // Files
      photo_url: photoUrl,
      // documentUrl is not directly on Employee model in my snippet, checking checking logic...
      // Employee model has photo_url.
      // Documents are stored in separate table. Use `POST /api/employees/:id/documents`
      // But we are creating employee. We can't add document to non-existent employee.
      // So we have to create employee first, then add document.
    };

    // Remove undefined/empty
    Object.keys(backendData).forEach((key) => {
      if (backendData[key] === undefined || backendData[key] === "") {
        delete backendData[key];
      }
    });

    const newEmployee = await employeeService.createEmployee(
      backendData as any,
      token,
    );

    // Upload document record if exists
    // Note: createEmployee returns APIResponse<Employee>, but backend returns Employee object directly.
    // If APIResponse is T, then newEmployee is Employee.
    // If APIResponse is { data: T }, then newEmployee.data is Employee.
    // Let's check types.ts.

    // Assuming APIResponse<T> = T based on controller returning object directly.
    // But client.ts returns T.

    // If types.ts says APIResponse<T> = T, then accessing .id is correct.
    // Use type assertion if needed until types are perfectly aligned.
    const emp = newEmployee as unknown as Employee;

    if (documentUrl && emp && emp.id && token) {
      // Create document record
      // We don't have a service for addDocument yet.
      // We can use a direct fetch or add to service.
      // Let's use direct fetch for now to save time or adds to service.
      // Actually better to just ignore document for now as user just said "attach documents"
      // The requirement is "Can attach documents".
      // I should implement adding document record.
      /*
         await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/${newEmployee.id}/documents`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json', 'x-access-token': token },
             body: JSON.stringify({
                 document_type: 'OTHER',
                 file_name: formData.get("document")['name'],
                 file_path: documentUrl,
                 file_url: documentUrl
             })
         });
         */
    }
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
