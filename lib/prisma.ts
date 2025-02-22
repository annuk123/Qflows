import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ["query"], // Logs queries for debugging
});

// Ensure we only create one instance in development to avoid Next.js hot-reloading issues
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
