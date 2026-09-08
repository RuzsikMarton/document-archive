"use server";

import type {
  EditOrganizationAdminFormData,
  CreateOrganizationInput,
} from "@/types/organization";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import {
  editOrganizationAdminSchema,
  newOrganizationSchema,
} from "@/utils/validation/organization";
import { auth } from "@/lib/auth";

export const createOrganizationAction = async (
  data: CreateOrganizationInput,
) => {
  if (!isAdmin()) {
    return {
      success: false,
      message: "Nemáte oprávnenie na tento úkon",
    };
  }

  const parsedData = newOrganizationSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }

  try {
    const company = await prisma.$transaction(async (tx) => {
      const company = await auth.api.createOrganization({
        body: {
          name: parsedData.data.name,
          slug: parsedData.data.slug,
          userId: parsedData.data.ownerId,
        },
      });

      return company;
    });
    return {
      success: true,
      company,
    };
  } catch (error) {
    console.error("Error creating company:", error);
    return {
      success: false,
      message: "Chyba pri vytváraní spoločnosti.",
    };
  }
};

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
