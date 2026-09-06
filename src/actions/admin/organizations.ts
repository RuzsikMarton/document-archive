"use server";

import type { EditOrganizationAdminFormData } from "@/types/organization";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import { editOrganizationAdminSchema } from "@/utils/validation/organization";

export const updateOrganizationAdmin = async (
  id: string,
  data: EditOrganizationAdminFormData,
) => {
  if (!isAdmin()) {
    return {
      success: false,
      message: "Nemáte oprávnenie na aktualizáciu organizácie",
    };
  }

  const parsedData = editOrganizationAdminSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }
  try {
    await prisma.organization.update({
      where: {
        id,
      },
      data: parsedData.data,
    });
    revalidatePath("/admin/organizations");
    return { success: true, message: "Organizácia bola úspešne aktualizovaná" };
  } catch (error) {
    console.error("Error updating organization:", error);
    return {
      success: false,
      message: "Nepodarilo sa aktualizovať organizáciu",
    };
  }
};

export const deleteOrganizationAdmin = async (id: string) => {
  if (!isAdmin()) {
    return {
      success: false,
      message: "Nemáte oprávnenie na zmazanie organizácie",
    };
  }
  try {
    await prisma.organization.delete({
      where: {
        id,
      },
    });
    revalidatePath("/admin/organizations");
    return { success: true, message: "Organizácia bola úspešne zmazaná" };
  } catch (error) {
    console.error("Error deleting organization:", error);
    return { success: false, message: "Nepodarilo sa zmazať organizáciu" };
  }
};
