import { PrismaClient } from "@prisma/client";

// Default to a writable location when running on Vercel. Its root filesystem
// is read‑only, so a SQLite database in the repository cannot be updated.
// Fallback to `./dev.db` during local development.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = process.env.VERCEL
    ? "file:/tmp/dev.db"
    : "file:./dev.db";
}

const globalForPrisma = global;
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

