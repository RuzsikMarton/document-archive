import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins/custom-session";
import { organization } from "better-auth/plugins/organization";
import { Resend } from "resend";
import PasswordResetEmail from "@/components/emails/reset-password";
import emailVerification from "@/components/emails/email-verification";
import OrganizationInvitationEmail from "@/components/emails/oragnization-invitation";

const resend = new Resend(process.env.RESEND_API_KEY || "");

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
      requireEmailVerificationOnInvitation: true,
      creatorRole: "owner",
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/invitation/${data.id}`;
        resend.emails.send({
          from: "Evidio <no-reply@evidio.rk-r.sk>",
          to: data.email,
          subject: "Pozvánka do organizácie",
          react: OrganizationInvitationEmail({
            email: data.email,
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            teamName: data.organization.name,
            inviteLink,
          }),
        });
      },
    }),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth({
  ...options,

  plugins: [
    ...(options.plugins ?? []),

    customSession(async ({ user, session }) => {
      const userData = await prisma.user.findUnique({
        where: {
          id: session.userId,
        },
        select: {
          role: true,
          telephone: true,
        },
      });

      let member = null;

      if (session.activeOrganizationId) {
        member = await prisma.member.findFirst({
          where: {
            userId: session.userId,
            organizationId: session.activeOrganizationId,
          },
          select: {
            id: true,
            role: true,
            organizationId: true,
            organization: {
              select: {
                name: true,
                slug: true,
                logo: true,
              },
            },
          },
        });
      }

      return {
        session,
        user: {
          ...user,
          role: userData?.role,
          telephone: userData?.telephone,
          organization: member
            ? {
                id: member.organizationId,
                name: member.organization.name,
                slug: member.organization.slug,
                role: member.role,
                logo: member.organization.logo,
                memberId: member.id,
              }
            : null,
        },
      };
    }, options),

    nextCookies(),
  ],
});
