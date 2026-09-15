"use server";

import { getSession } from "@/utils/auth";
import { prisma } from "../prisma";

export const getUsersById = async (id: string) => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        sessions: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        members: {
          select: {
            id: true,
            role: true,
            organization: {
              select: {
                id: true,
                name: true,
                slug: true,
                email: true,
                city: true,
              },
            },
            folders: {
              orderBy: { createdAt: "desc" },
              take: 5,
            },
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user");
  }
};

export const getHasOwnedOrganization = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        members: {
          select: {
            role: true,
          },
        },
      },
    });
    return user?.members.some((member) => member.role === "owner");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch organization status");
  }
};
