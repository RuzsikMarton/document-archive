"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/auth";
import { checkFolderOwnership } from "@/utils/folder";
import { EditFolderSchema } from "@/utils/validation/folder";

export const getFolderById = async (id: string) => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: id,
    },
  });

  return folder;
};

export const updateFolderAction = async (data: any, folderId: string) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      message: "Neautorizovaný prístup.",
    };
  }

  const check = await checkFolderOwnership(session.user.id, folderId);
  if (!check.success) {
    return check;
  }

  const parsedData = EditFolderSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }

  try {
    await prisma.folder.update({
      where: { id: folderId },
      data: {
        name: parsedData.data.name,
        year: parsedData.data.year,
        monthFrom: parsedData.data.monthFrom,
        monthTo: parsedData.data.monthTo,
        contents: parsedData.data.contents,
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Chyba pri aktualizácii záznamu.",
    };
  }
};

export const deleteFolderAction = async (folderId: string) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      message: "Neautorizovaný prístup.",
    };
  }

  const check = await checkFolderOwnership(session.user.id, folderId);
  if (!check.success) {
    return check;
  }

  try {
    await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
  } catch (error) {
    return {
      success: false,
      message: "Chyba pri odstraňovaní záznamu.",
    };
  }
  return { success: true };
};

export const folderHandedOverAction = async (folderId: string) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      message: "Neautorizovaný prístup.",
    };
  }

  const check = await checkFolderOwnership(session.user.id, folderId);
  if (!check.success) {
    return check;
  }

  try {
    await prisma.folder.update({
      where: { id: folderId },
      data: {
        handedOver: true,
        handedOverAt: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Chyba pri aktualizácii záznamu.",
    };
  }
};

//TODO
export const generateTransferCodeAction = async (folderId: string) => {};
