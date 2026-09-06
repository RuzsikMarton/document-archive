import { isAdmin } from "@/utils/auth";
import { prisma } from "../prisma";

export const getAdminDataUsers = async ({
  search,
  page,
  role,
  inOrganization,
}: {
  search?: string;
  page?: number;
  role?: "ADMIN" | "USER";
  inOrganization?: "in" | "out";
}) => {
  if (!(await isAdmin())) {
    return {
      success: false,
      message: "Neautorizovaný prístup.",
    };
  }

  const take = 20;
  const skip = page && page > 1 ? (page - 1) * take : 0;
  const where = {
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),

    ...(role
      ? {
          role,
        }
      : {}),

    ...(inOrganization !== undefined
      ? {
          members:
            inOrganization === "in"
              ? {
                  some: {},
                }
              : {
                  none: {},
                },
        }
      : {}),
  };

  try {
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        where,
        include: {
          members: {
            include: {
              organization: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      }),
      prisma.user.count({
        where,
      }),
    ]);

    return {
      success: true,
      data: users,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching admin data users:", error);
    return {
      success: false,
      message: "Chyba pri načítavaní administrátorských údajov používateľov.",
    };
  }
};

export const getAdminDataOrganizations = async ({
  search,
  page,
}: {
  search?: string;
  page?: number;
}) => {
  if (!(await isAdmin())) {
    return {
      success: false,
      message: "Neautorizovaný prístup.",
    };
  }

  const take = 20;
  const skip = page && page > 1 ? (page - 1) * take : 0;
  const where = {
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              slug: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              ico: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),
  };

  try {
    const [organizations, totalCount] = await Promise.all([
      prisma.organization.findMany({
        skip,
        take,
        where,
        include: {
          _count: {
            select: { members: true },
          },
        },
      }),
      prisma.organization.count({
        where,
      }),
    ]);

    return {
      success: true,
      data: organizations,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching admin data organizations:", error);
    return {
      success: false,
      message: "Chyba pri načítavaní administrátorských údajov organizácií.",
    };
  }
};
