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
