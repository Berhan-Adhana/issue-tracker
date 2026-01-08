import { NextAuthConfig } from "next-auth";
import { prisma } from "@/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthConfig = {
adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};
