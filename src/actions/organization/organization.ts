"use server";

import { prisma } from "@/lib/prisma";
import { EditOrganizationFormData } from "@/types/organization";
import { getSession } from "@/utils/auth";
import { editOrganizationSchema } from "@/utils/validation/organization";

export const EditOrganizationDetailsAction = async (
  data: EditOrganizationFormData,
) => {
  const session = await getSession();

  if (!session || !session.session.activeOrganizationId) {
    return {
      success: false,
      message: "Neautorizovaný prístup.",
    };
  }

  const parsedData = editOrganizationSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }

  try {
    await prisma.organization.update({
      where: {
        id: session.session.activeOrganizationId,
      },
      data: {
        name: parsedData.data.name,
        ico: parsedData.data.ico,
        dic: parsedData.data.dic,
        address: parsedData.data.address,
        city: parsedData.data.city,
        postalCode: parsedData.data.postalCode,
        website: parsedData.data.website,
        email: parsedData.data.email,
        telephone: parsedData.data.telephone,
      },
    });

    return {
      success: true,
      message: "Organizácia bola úspešne aktualizovaná.",
    };
  } catch (error) {
    console.error("Error updating organization data", error);
    return {
      success: false,
      message: "Chyba pri aktualizácii organizácie.",
    };
  }
};
