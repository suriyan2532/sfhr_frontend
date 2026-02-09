import { prisma } from '@/lib/prisma';

export async function getDepartments() {
  return await prisma.department.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getPositions() {
  return await prisma.position.findMany({
    orderBy: { title: 'asc' },
  });
}

export async function getCompanies() {
  return await prisma.company.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getUnits() {
  return await prisma.unit.findMany({
    orderBy: { name: 'asc' },
  });
}

export async function getWorkingShifts() {
  return await prisma.workingShift.findMany({
    orderBy: { name: 'asc' },
  });
}
