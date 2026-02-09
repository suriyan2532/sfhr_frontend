'use server';

import { prisma } from '@/lib/prisma';
import { employeeSchema } from '@/lib/validators/employee-schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getEmployees(query: string, currentPage: number = 1) {
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;

  try {
    const employees = await prisma.employee.findMany({
      where: {
        isDeleted: false,
        OR: [
          { person: { firstName: { contains: query, mode: 'insensitive' } } },
          { person: { lastName: { contains: query, mode: 'insensitive' } } },
          { employeeId: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        person: true,
        department: true,
        positions: {
            include: {
                position: true
            }
        },
      },
      orderBy: { joinDate: 'desc' },
      skip,
      take: pageSize,
    });

    const totalCount = await prisma.employee.count({
      where: {
        isDeleted: false,
        OR: [
          { person: { firstName: { contains: query, mode: 'insensitive' } } },
          { person: { lastName: { contains: query, mode: 'insensitive' } } },
          { employeeId: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    return { employees, totalCount, totalPages: Math.ceil(totalCount / pageSize) };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch employees.');
  }
}

export async function createEmployee(formData: FormData) {
  // Extract raw data from FormData
  const rawData: any = Object.fromEntries(formData.entries());
  // Handle multiple positionIds
  rawData.positionIds = formData.getAll('positionIds');
  
  // Validate fields using Zod
  const validatedFields = employeeSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Employee.',
    };
  }

  const { data } = validatedFields;
  const { positionIds, ...rest } = data;

  try {
    // 1. Handle Person (Find or Create)
    let person = await prisma.person.findUnique({
        where: { idCard: data.idCard }
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
            }
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
        }))
    });

  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Employee.',
    };
  }

  revalidatePath('/dashboard/employees');
  redirect('/dashboard/employees');
}

export async function deleteEmployee(id: string) {
  try {
    await prisma.employee.update({
      where: { id },
      data: { 
        isDeleted: true,
        deletedAt: new Date()
      },
    });
    revalidatePath('/dashboard/employees');
    return { message: 'Deleted Employee.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Employee.' };
  }
}
