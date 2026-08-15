import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession, organization } from "better-auth/plugins";
import { Resend } from "resend";
import PasswordResetEmail from "@/components/emails/reset-password";
import emailVerification from "@/components/emails/email-verification";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function getSessionUserData(
  userId: string,
  organizationId?: string | null,
) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      role: true,
      members: organizationId
        ? {
            where: {
              organizationId,
            },
            select: {
              role: true,
              organizationId: true,
              organization: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          }
        : false,
    },
  });
}

const options = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      resend.emails.send({
        from: "Evidio <no-reply@evidio.rk-r.sk>",
        to: user.email,
        subject: "Obnovenie hesla",
        react: PasswordResetEmail({
          companyName: "Evidio",
          userName: user.name,
          url,
        }),
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, token }) => {
      resend.emails.send({
        from: "Evidio <no-reply@evidio.rk-r.sk>",
        to: user.email,
        subject: "Overenie e-mailu",
        react: emailVerification({
          companyName: "Evidio",
          userName: user.name,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`,
        }),
      });
    },
  },

  rateLimit: {
    enabled: true,
    customRules: {
      "/send-verification-email": {
        window: 60 * 60 * 24,
        max: 3,
      },
      "/send-reset-password": {
        window: 60 * 60 * 24,
        max: 3,
      },
    },
  },

  user: {
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
  },

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const membership = await prisma.member.findFirst({
            where: {
              userId: session.userId,
            },
            orderBy: {
              createdAt: "asc",
            },
            select: {
              organizationId: true,
            },
          });

          return {
            data: {
              ...session,
              activeOrganizationId: membership?.organizationId ?? null,
            },
          };
        },
      },
    },
  },

  plugins: [
    organization({
      allowUserToCreateOrganization: false,
      creatorRole: "owner",
    }),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,

  plugins: [
    ...(options.plugins ?? []),

    customSession(async ({ user, session }) => {
      const activeOrganizationId = session.activeOrganizationId;

      const userData = await getSessionUserData(
        session.userId,
        activeOrganizationId,
      );

      const member = userData?.members?.[0] as
        | {
            role: string;
            organizationId: string;
            organization: {
              id: string;
              name: string;
              slug: string;
            };
          }
        | undefined;

      return {
        session,
        user: {
          ...user,
          role: userData?.role,
          organization: member
            ? {
                id: member.organization.id,
                name: member.organization.name,
                slug: member.organization.slug,
                role: member.role,
                organizationId: member.organizationId,
              }
            : null,
        },
      };
    }, options),

    nextCookies(),
  ],
});
