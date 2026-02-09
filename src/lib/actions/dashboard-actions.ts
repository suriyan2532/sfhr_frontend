'use server';

import { prisma } from '@/lib/prisma';

export async function getDashboardSummary() {
    try {
        const today = new Date();
        const todayStart = new Date(today.setHours(0, 0, 0, 0));
        const todayEnd = new Date(today.setHours(23, 59, 59, 999));

        // 1. Total Active Employees
        const totalEmployees = await prisma.employee.count({
            where: { isDeleted: false, status: { notIn: ['RESIGNED', 'TERMINATED'] } }
        });

        // 2. Present Today (from Attendance)
        const presentToday = await prisma.attendance.count({
            where: {
                date: {
                    gte: todayStart,
                    lte: todayEnd
                },
                status: 'PRESENT'
            }
        });

        // 3. On Leave Today
        const onLeaveToday = await prisma.leaveRequest.count({
            where: {
                status: 'APPROVED',
                startDate: { lte: todayEnd },
                endDate: { gte: todayStart }
            }
        });

        // 4. Pending Approvals (Leave)
        const pendingLeaveRequests = await prisma.leaveRequest.count({
            where: { status: 'PENDING' }
        });

        // 5. Attendance Trend (Last 7 Days)
        const trendData = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dStart = new Date(d.setHours(0, 0, 0, 0));
            const dEnd = new Date(d.setHours(23, 59, 59, 999));
            
            const count = await prisma.attendance.count({
                where: {
                    date: {
                        gte: dStart,
                        lte: dEnd
                    },
                    status: 'PRESENT'
                }
            });
            
            trendData.push({
                date: days[d.getDay()],
                fullDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                count
            });
        }

        // 6. Recent Activities (Sample joiners and leave)
        const [recentEmployees, recentLeaves] = await Promise.all([
            prisma.employee.findMany({
                where: { isDeleted: false },
                orderBy: { createdAt: 'desc' },
                take: 5,
                select: { firstName: true, lastName: true, createdAt: true }
            }),
            prisma.leaveRequest.findMany({
                where: { status: 'APPROVED' },
                orderBy: { updatedAt: 'desc' },
                take: 5,
                include: { employee: true, leaveType: true }
            })
        ]);

        return {
            stats: {
                totalEmployees,
                presentToday,
                onLeaveToday,
                pendingApprovals: pendingLeaveRequests
            },
            trendData,
            activities: {
                recentEmployees,
                recentLeaves
            }
        };
    } catch (error) {
        console.error("Dashboard data error:", error);
        return {
            stats: { totalEmployees: 0, presentToday: 0, onLeaveToday: 0, pendingApprovals: 0 },
            trendData: [],
            activities: { recentEmployees: [], recentLeaves: [] }
        };
    }
}
