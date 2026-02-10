import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const leaveTypes = [
    { code: 'W', name: 'Weekly Holiday', category: 'HOLIDAY' },
    { code: 'PH', name: 'Public Holiday', category: 'HOLIDAY' },
    { code: 'S', name: 'Sick Leave', category: 'LEAVE' },
    { code: 'P', name: 'Personal Leave', category: 'LEAVE' },
    { code: 'V', name: 'Vacation Leave', category: 'LEAVE' },
    { code: 'O', name: 'Ordination Leave', category: 'LEAVE' },
    { code: 'L', name: 'Maternity Leave', category: 'LEAVE' },
    { code: 'M', name: 'Marriage Leave', category: 'LEAVE' },
    { code: 'MS', name: 'Military Service Leave', category: 'LEAVE' },
    { code: 'NS', name: 'No Salary Leave', category: 'LEAVE_NO_PAY' },
  ];

  console.log('Seeding Leave Types...');

  for (const type of leaveTypes) {
    await prisma.leaveTypeMaster.upsert({
      where: { code: type.code },
      update: { name: type.name, category: type.category },
      create: {
        code: type.code,
        name: type.name,
        category: type.category,
        description: type.name,
        maxDaysPerYear: 30, // Default value, can be adjusted
      },
    });
  }

  console.log('Leave Types seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
