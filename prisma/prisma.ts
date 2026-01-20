import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST!,
    port: Number(process.env.DATABASE_PORT ?? 4000),
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    connectionLimit: 10, // 🔑 VERY IMPORTANT for TiDB + Vercel
    // ssl: {
    //   rejectUnauthorized: true,
    // },
  });

  return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ✅ CACHE IN ALL ENVIRONMENTS (INCLUDING PRODUCTION)
//globalForPrisma.prisma = prisma;
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
