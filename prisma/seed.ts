import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create Company
  const company = await prisma.company.upsert({
    where: { code: "SFHR_HQ" },
    update: {},
    create: {
      name: "Safari HR Headquarters",
      code: "SFHR_HQ",
    },
  });

  // Create Departments
  const devDept = await prisma.department.upsert({
    where: {
      companyId_code: {
        companyId: company.id,
        code: "IT",
      },
    },
    update: {},
    create: {
      name: "Information Technology",
      code: "IT",
      companyId: company.id,
    },
  });

  const hrDept = await prisma.department.upsert({
    where: {
      companyId_code: {
        companyId: company.id,
        code: "HR",
      },
    },
    update: {},
    create: {
      name: "Human Resources",
      code: "HR",
      companyId: company.id,
    },
  });

  // Create Positions
  const seTitle = "Software Engineer";
  const existingSE = await prisma.position.findFirst({
    where: { title: seTitle, departmentId: devDept.id },
  });

  if (!existingSE) {
    await prisma.position.create({
      data: {
        title: seTitle,
        level: 3,
        departmentId: devDept.id,
      },
    });
  }

  const hrTitle = "HR Manager";
  const existingHR = await prisma.position.findFirst({
    where: { title: hrTitle, departmentId: hrDept.id },
  });

  if (!existingHR) {
    await prisma.position.create({
      data: {
        title: hrTitle,
        level: 5,
        departmentId: hrDept.id,
      },
    });
  }

  // Create Admin User
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN", // Assuming SUPER_ADMIN is a valid role enum
      isActive: true,
    },
    create: {
      username: "admin",
      email: "admin@safarihr.com",
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
