/**
 * Prisma 7 Configuration
 * This file configures the database connection for Prisma Migrate.
 * The connection URL is read from the DATABASE_URL environment variable.
 */
export default {
  datasources: {
    db: {
      url: process.env.DATABASE_URL!,
    },
  },
};
