
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing getEmployees query...');
  try {
    const employees = await prisma.employee.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        person: true,
        department: true, // Test department include
        positions: {      // Test positions include
            include: {
                position: true
            }
        },
      },
      orderBy: { joinDate: 'desc' },
      take: 10,
    });
    console.log('Successfully fetched employees:', employees.length);
    console.log(JSON.stringify(employees[0], null, 2));
  } catch (error) {
    console.error('Error fetching employees:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
