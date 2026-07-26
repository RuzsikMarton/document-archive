import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";

async function findUserRoles(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    return user?.role || "USER";
  } catch (error) {
    console.error("Error finding user role:", error);
    return "USER"; // Default fallback
  }
}

export const auth = betterAuth({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
    changePassword: {
      enabled: true,
    },
    findRoles: findUserRoles,
  },
  plugins: [
    customSession(async ({ user, session }) => {
      const role = await findUserRoles(session.userId);

      return {
        role,
        session,
        user,
      };
    }),
    nextCookies(),
  ],
});
