import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding benefits...');

    // 1. Create Benefit Types
    const benefitTypes = [
        { code: 'MEDICAL', name: 'Medical Expense', nameTh: 'ค่ารักษาพยาบาล', maxAmount: 20000 },
        { code: 'DENTAL', name: 'Dental Care', nameTh: 'ค่าทันตกรรม', maxAmount: 5000 },
        { code: 'TRAINING', name: 'Training & Development', nameTh: 'ค่าฝึกอบรมและพัฒนาทรัพยากรบุคคล', maxAmount: 15000 },
        { code: 'WELLNESS', name: 'Wellness & Fitness', nameTh: 'สุขภาพและฟิตเนส', maxAmount: 3000 },
    ];

    for (const type of benefitTypes) {
        await prisma.benefitType.upsert({
            where: { code: type.code },
            update: type,
            create: type,
        });
    }

    // 2. Assign budgets to all active employees for current year
    const employees = await prisma.employee.findMany({
        where: { 
            isDeleted: false, 
            status: { in: ['ACTIVE', 'PROBATION'] }
        }
    });

    const currentYear = new Date().getFullYear();
    const types = await prisma.benefitType.findMany();

    for (const emp of employees) {
        for (const type of types) {
            await prisma.benefitBudget.upsert({
                where: {
                    employeeId_benefitTypeId_year: {
                        employeeId: emp.id,
                        benefitTypeId: type.id,
                        year: currentYear
                    }
                },
                update: {},
                create: {
                    employeeId: emp.id,
                    benefitTypeId: type.id,
                    year: currentYear,
                    totalAmount: type.maxAmount || 10000,
                    usedAmount: 0
                }
            });
        }
    }

    console.log('Benefits seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
