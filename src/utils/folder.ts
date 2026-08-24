import { prisma } from "@/lib/prisma";

export const checkFolderOwnership = async (
  userId: string,
  folderId: string,
) => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
  });

  if (!folder || folder.memberId !== userId) {
    return {
      success: false,
      message: "Nemáte oprávnenie upravovať tento záznam.",
    };
  }

  return {
    success: true,
  };
};

export const checkFolderAccess = async (
  organizationId: string,
  folderId: string,
) => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
      organizationId,
    },
  });

  if (!folder || folder.organizationId !== organizationId) {
    return {
      success: false,
      message: "Nemáte oprávnenie pristupovať k tomuto záznamu.",
    };
  }

  return {
    success: true,
  };
};
