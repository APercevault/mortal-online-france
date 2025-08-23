import { PrismaClient } from "@prisma/client";

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
