import { getSession } from "@/utils/auth";
import { prisma } from "../prisma";

export const getOrganizationStats = async () => {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  const organizationId = session.session.activeOrganizationId;

  if (!organizationId) {
    return null;
  }

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

  const [employees, folders, handedOverFolders, notHanded, foldersThisYear] =
    await prisma.$transaction([
      prisma.member.count({
        where: {
          organizationId,
        },
      }),

      prisma.folder.count({
        where: {
          organizationId,
        },
      }),

      prisma.folder.count({
        where: {
          organizationId,
          handedOver: true,
        },
      }),

      prisma.folder.count({
        where: {
          organizationId,
          handedOver: false,
        },
      }),

      prisma.folder.count({
        where: {
          organizationId,
          createdAt: {
            gte: startOfYear,
            lt: startOfNextYear,
          },
        },
      }),
    ]);

  return {
    employees,
    folders,
    handedOverFolders,
    notHanded,
    foldersThisYear,
  };
};

export const getOrganizationEmployees = async ({
  search,
  page,
}: {
  search?: string;
  page?: number;
}) => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "Neautorizovaný prístup. Prosím prihláste sa.",
    };
  }

  if (
    !session.session.activeOrganizationId ||
    (session.session.activeOrganizationId &&
      session.user.organization?.role !== "owner")
  ) {
    return {
      success: false,
      message:
        "Nemáte oprávnenie na prístup k týmto údajom. Prosím kontaktujte administrátora.",
    };
  }

  const pageSize = 10;
  const skip = page && page > 1 ? (page - 1) * pageSize : 0;

  try {
    const employees = await prisma.member.findMany({
      where: {
        organizationId: session.session.activeOrganizationId,

        ...(search
          ? {
              user: {
                OR: [
                  {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            }
          : {}),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      skip,
      take: pageSize,
    });

    const totalCount = await prisma.member.count({
      where: {
        organizationId: session.session.activeOrganizationId,

        ...(search
          ? {
              user: {
                OR: [
                  {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                ],
              },
            }
          : {}),
      },
    });
    return {
      employees,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching organization employees:", error);
    return {
      success: false,
      message: "Nastala chyba pri načítaní zamestnancov organizácie.",
    };
  }
};

export const getPendingInvitations = async () => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "Neautorizovaný prístup. Prosím prihláste sa.",
    };
  }

  if (
    !session.session.activeOrganizationId ||
    (session.session.activeOrganizationId &&
      session.user.organization?.role !== "owner")
  ) {
    return {
      success: false,
      message:
        "Nemáte oprávnenie na prístup k týmto údajom. Prosím kontaktujte administrátora.",
    };
  }

  try {
    const invitations = await prisma.invitation.findMany({
      where: {
        organizationId: session.session.activeOrganizationId,
        status: {
          in: ["pending", "expired"],
        },
      },
    });
    return {
      success: true,
      invitations,
    };
  } catch (error) {
    console.error("Error fetching pending invitations:", error);
    return {
      success: false,
      message: "Nastala chyba pri načítaní čakajúcich pozvánok.",
    };
  }
};
