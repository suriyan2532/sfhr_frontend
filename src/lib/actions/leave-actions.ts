'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export async function getLeaveSummary(employeeId: string) {
  // Mock data for now, or calculate from LeaveRequest if rules exist
  // In a real app, this would query a LeaveBalance table
  return [
    { type: 'Vacation', used: 2, total: 10, code: 'V' },
    { type: 'Sick Leave', used: 1, total: 30, code: 'S' },
    { type: 'Business Leave', used: 0, total: 5, code: 'P' },
  ];
}

export async function getLeaveRequests(employeeId: string) {
  try {
    const requests = await prisma.leaveRequest.findMany({
      where: { employeeId },
      include: { leaveType: true },
      orderBy: { createdAt: 'desc' },
    });
    return requests;
  } catch (error) {
    console.error('Failed to fetch leave requests:', error);
    return [];
  }
}

export async function getLeaveTypes() {
    try {
        return await prisma.leaveTypeMaster.findMany({
            where: { isDeleted: false }
        });
    } catch (error) {
        console.error("Failed to fetch leave types", error);
        return [];
    }
}

export async function createLeaveRequest(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
      return { message: 'Unauthorized' };
  }

  // TODO: Get real employee ID from session/user
  // For now, we might need to fetch the employee associated with the user
  const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { employee: true }
  });

  if (!user?.employee) {
      return { message: 'Employee profile not found' };
  }

  const employeeId = user.employee.id;
  const leaveTypeId = formData.get('leaveTypeId') as string;
  const startDate = new Date(formData.get('startDate') as string);
  const endDate = new Date(formData.get('endDate') as string);
  const reason = formData.get('reason') as string;
  
  // Calculate days (simplified)
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

  try {
    await prisma.leaveRequest.create({
      data: {
        employeeId,
        leaveTypeId,
        startDate,
        endDate,
        days: days > 0 ? days : 1, // Minimum 1 day
        reason,
        status: 'PENDING',
      },
    });
    revalidatePath('/leaves');
    return { message: 'Leave request submitted successfully' };
  } catch (error) {
    console.error('Failed to create leave request:', error);
    return { message: 'Failed to submit leave request' };
  }
}

export async function cancelLeaveRequest(requestId: string) {
    try {
        await prisma.leaveRequest.update({
            where: { id: requestId },
            data: { status: 'CANCELLED' }
        });
        revalidatePath('/leaves');
        return { message: 'Leave request cancelled' };
    } catch (error) {
        return { message: 'Failed to cancel request' };
    }
}
