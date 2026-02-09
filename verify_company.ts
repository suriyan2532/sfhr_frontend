import { prisma } from './src/lib/prisma';

async function main() {
  try {
    // Try to selecting the new field
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        isDeleted: true, // This should fail if field doesn't exist
      },
      take: 1
    });
    console.log('Successfully queried isDeleted column:', companies);
  } catch (error) {
    console.error('Error querying isDeleted:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
