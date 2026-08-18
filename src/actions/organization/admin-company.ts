"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateOrganizationInput } from "@/types/organization";
import { getSession } from "@/utils/auth";
import { newOrganizationSchema } from "@/utils/validation/organization";

export const createCompanyAction = async (data: CreateOrganizationInput) => {
  const session = await getSession();

  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Nemáte oprávnenie na tento úkon.",
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
