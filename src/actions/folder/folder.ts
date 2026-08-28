"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/auth";
import { checkFolderAccess } from "@/utils/folder";
import { EditFolderSchema } from "@/utils/validation/folder";
import type { UpdateFolderFormType } from "@/types/folder";
import { revalidatePath } from "next/cache";

export const updateFolderAction = async (
  data: UpdateFolderFormType,
  folderId: string,
) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      message: "Neautorizovaný prístup.",
    };
  }

  const organizationId = session.session.activeOrganizationId;

  if (!organizationId) {
    return {
      success: false,
      message: "Nemáte aktívnu organizáciu.",
    };
  }

  const check = await checkFolderAccess(organizationId, folderId);
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

    // Invalidate cache for both the list and detail pages
    revalidatePath("/folders");
    revalidatePath(`/folders/${folderId}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating folder:", error);
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

  const organizationId = session.session.activeOrganizationId;

  if (!organizationId) {
    return {
      success: false,
      message: "Nemáte aktívnu organizáciu.",
    };
  }

  const check = await checkFolderAccess(organizationId, folderId);
  if (!check.success) {
    return check;
  }

  try {
    await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });

    // Invalidate cache so the deleted folder is removed from the list
    revalidatePath("/folders");
  } catch (error) {
    console.error("Error deleting folder:", error);
    return {
      success: false,
      message: "Chyba pri odstraňovaní záznamu.",
    };
  }
  return { success: true };
};

export const folderHandedOverAction = async (
  folderId: string,
  handed: boolean,
) => {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      message: "Neautorizovaný prístup.",
    };
  }

  const organizationId = session.session.activeOrganizationId;

  if (!organizationId) {
    return {
      success: false,
      message: "Nemáte aktívnu organizáciu.",
    };
  }

  const check = await checkFolderAccess(organizationId, folderId);
  if (!check.success) {
    return check;
  }

  try {
    await prisma.folder.update({
      where: { id: folderId },
      data: {
        handedOver: handed,
        handedOverAt: handed ? new Date() : undefined,
      },
    });

    // Invalidate cache for both the list and detail pages
    revalidatePath("/folders");
    revalidatePath(`/folders/${folderId}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating folder handed over status:", error);
    return {
      success: false,
      message: "Chyba pri aktualizácii záznamu.",
    };
  }
};
