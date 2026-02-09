import { prisma } from './src/lib/prisma'

async function main() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to the database')
    const companyCount = await prisma.company.count()
    console.log(`Current company count: ${companyCount}`)
  } catch (e) {
    console.error('Error connecting to database:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
