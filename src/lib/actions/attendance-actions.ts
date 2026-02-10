'use server';

import { prisma } from '@/lib/prisma';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { auth } from '@/auth';

export async function getAttendanceData(month: number, year: number, employeeId?: string) {
    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = endOfMonth(startDate);

        // If no employeeId provided, get all active employees (Team View)
        // If employeeId provided, just for that employee (Self View)
        const employees = await prisma.employee.findMany({
            where: {
                id: employeeId ? employeeId : undefined,
                isDeleted: false,
                status: { notIn: ['RESIGNED', 'TERMINATED'] }
            },
            include: {
                person: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                department: {
                    select: {
                        name: true
                    }
                },
                attendances: {
                    where: {
                        date: {
                            gte: startDate,
                            lte: endDate
                        }
                    }
                },
                leaves: {
                    where: {
                        status: 'APPROVED',
                        OR: [
                            { startDate: { lte: endDate }, endDate: { gte: startDate } }
                        ]
                    },
                    include: {
                        leaveType: true
                    }
                }
            },
            orderBy: { employeeId: 'asc' }
        });

        const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

        const records = employees.map(emp => {
            const days = daysInMonth.map(date => {
                const dateStr = format(date, 'yyyy-MM-dd');
                
                // Check attendance
                const att = emp.attendances.find(a => format(a.date, 'yyyy-MM-dd') === dateStr);
                
                // Check leave
                const leave = emp.leaves.find(l => {
                    const start = format(l.startDate, 'yyyy-MM-dd');
                    const end = format(l.endDate, 'yyyy-MM-dd');
                    return dateStr >= start && dateStr <= end;
                });

                let status = att?.status;
                if (leave) status = 'LEAVE';

                return {
                    day: date.getDate(),
                    date: dateStr,
                    status: status,
                    leaveType: leave?.leaveType.code,
                    timeIn: att?.checkIn ? format(att.checkIn, 'HH:mm') : null,
                    timeOut: att?.checkOut ? format(att.checkOut, 'HH:mm') : null,
                };
            });

            return {
                id: emp.id,
                employeeCode: emp.employeeId,
                name: `${emp.person.firstName} ${emp.person.lastName}`,
                department: emp.department.name,
                days: days,
                totalDays: days.filter(d => d.status === 'PRESENT' || d.status === 'LEAVE').length
            };
        });

        return records;
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        return [];
    }
}

export async function getMyEmployeeId() {
    const session = await auth();
    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { employeeId: true }
    });

    return user?.employeeId || null;
}
