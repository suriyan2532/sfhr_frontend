import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Get the first user
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log('No user found');
    return;
  }
  console.log(`Found user: ${user.username} (${user.email})`);

  // 2. Get the first employee
  let employee = await prisma.employee.findFirst();
  
  if (!employee) {
    console.log('No employee found. Creating one...');
    // Create a dummy person first
    const person = await prisma.person.create({
        data: {
            firstName: 'Demo',
            lastName: 'Employee',
            idCard: '1234567890123',
        }
    });

    // Create a dummy company/dept if needed, but let's assume they exist from seed
    const company = await prisma.company.findFirst();
    const department = await prisma.department.findFirst();

    if (!company || !department) {
        console.log('Missing company or department. Please run seed.');
        return;
    }

    employee = await prisma.employee.create({
        data: {
            employeeId: 'EMP001',
            personId: person.id,
            companyId: company.id,
            departmentId: department.id,
            joinDate: new Date(),
        }
    });
  }
  console.log(`Found/Created employee: ${employee.employeeId}`);

  // 3. Link them
  await prisma.user.update({
    where: { id: user.id },
    data: { employeeId: employee.id }
  });

  console.log('Successfully linked user to employee.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
