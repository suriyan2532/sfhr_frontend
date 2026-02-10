'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function getBenefitSummary(employeeId: string) {
    try {
        const currentYear = new Date().getFullYear();
        
        const budgets = await prisma.benefitBudget.findMany({
            where: {
                employeeId,
                year: currentYear
            },
            include: {
                benefitType: true
            }
        });

        const claims = await prisma.benefitClaim.findMany({
            where: {
                employeeId,
                status: 'APPROVED'
            }
        });

        // Group budgets by benefit type
        return budgets.map(budget => {
            const usedInClaims = claims
                .filter(c => c.benefitTypeId === budget.benefitTypeId)
                .reduce((sum, c) => sum + c.amount, 0);

            return {
                id: budget.id,
                typeCode: budget.benefitType.code,
                typeName: budget.benefitType.name,
                typeNameTh: budget.benefitType.nameTh,
                total: budget.totalAmount,
                used: budget.usedAmount + usedInClaims, // Consider both manual usedAmount and approved claims
                remaining: budget.totalAmount - (budget.usedAmount + usedInClaims)
            };
        });
    } catch (error) {
        console.error('Error fetching benefit summary:', error);
        return [];
    }
}

export async function getBenefitClaims(employeeId: string) {
    try {
        return await prisma.benefitClaim.findMany({
            where: { employeeId },
            include: { benefitType: true },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error('Error fetching benefit claims:', error);
        return [];
    }
}

export async function getBenefitTypes() {
    try {
        return await prisma.benefitType.findMany({
            where: { isDeleted: false }
        });
    } catch (error) {
        console.error('Error fetching benefit types:', error);
        return [];
    }
}

export async function submitBenefitClaim(formData: FormData) {
    try {
        const session = await auth();
        if (!session?.user?.email) throw new Error('Unauthorized');

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { employee: true }
        });

        if (!user?.employeeId) throw new Error('Employee profile not linked');

        const benefitTypeId = formData.get('benefitTypeId') as string;
        const amount = parseFloat(formData.get('amount') as string);
        const description = formData.get('description') as string;

        // Check budget
        const budget = await prisma.benefitBudget.findUnique({
            where: {
                employeeId_benefitTypeId_year: {
                    employeeId: user.employeeId,
                    benefitTypeId,
                    year: new Date().getFullYear()
                }
            }
        });

        if (!budget) throw new Error('No budget found for this benefit type');
        
        const remaining = budget.totalAmount - budget.usedAmount;
        if (amount > remaining) throw new Error('Claim amount exceeds remaining budget');

        await prisma.benefitClaim.create({
            data: {
                employeeId: user.employeeId,
                benefitTypeId,
                amount,
                description,
                status: 'PENDING'
            }
        });

        revalidatePath('/dashboard/benefits');
        return { success: true };
    } catch (error: any) {
        console.error('Error submitting claim:', error);
        return { success: false, error: error.message };
    }
}
