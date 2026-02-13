/**
 * Prisma 7 Configuration
 * This file configures the database connection for Prisma Migrate.
 * The connection URL is read from the DATABASE_URL environment variable.
 */
const prismaConfig = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
  migrations: {
    seed: 'ts-node --compiler-options {\\"module\\":\\"CommonJS\\"} prisma/seed.ts',
  },
};

export default prismaConfig;
