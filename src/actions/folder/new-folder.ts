"use server";

import { prisma } from "@/lib/prisma";
import { CreateFolderFormType } from "@/types/folder";
import { getSession } from "@/utils/auth";
import { CreateFolderSchema } from "@/utils/validation/folder";
import QRCode from "qrcode";
import { revalidatePath } from "next/cache";

export const createFolder = async (data: CreateFolderFormType) => {
  const session = await getSession();

  const parsedData = CreateFolderSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }

  try {
    const folder = await prisma.$transaction(async (prisma) => {
      const newFolder = await prisma.folder.create({
        data: {
          name: parsedData.data.name,
          year: parsedData.data.year,
          companyId: session?.user?.companyId || "",
          userId: session?.user?.id || "",
        },
      });

      await prisma.folder.update({
        where: {
          id: newFolder.id,
        },
        data: {
          qrCodeImage: await QRCode.toDataURL(
            `${process.env.NEXT_PUBLIC_BASE_URL}/folders/${newFolder.id}`,
          ),
        },
      });

      return newFolder;
    });

    // Invalidate the folders page cache so the new folder appears immediately
    revalidatePath("/folders");

    return { success: true, id: folder.id };
  } catch (error) {
    console.error("Error creating folder:", error);
    return {
      success: false,
      message: "Chyba pri vytváraní šanónu.",
    };
  }
};

//NOT USED YET
export const getFolderSuggestions = async () => {
  const session = await getSession();
  const data = await prisma.folder.findMany({
    where: {
      userId: session?.user?.id,
    },
    select: {
      name: true,
    },
  });

  const names = [...new Set(data.map((folder) => folder.name))];

  return names;
};
