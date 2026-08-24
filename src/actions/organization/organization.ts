"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EditOrganizationFormData } from "@/types/organization";
import { getSession } from "@/utils/auth";
import { editOrganizationSchema } from "@/utils/validation/organization";
import { headers } from "next/headers";

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

  const { role } = await auth.api.getActiveMemberRole({
    headers: await headers(),
  });

  if (role !== "owner") {
    return {
      success: false,
      message: "Nemáte oprávnenie upraviť organizáciu.",
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

export const removeMemberAction = async (memberEmail: string) => {
  const session = await getSession();

  if (!session || !session.session.activeOrganizationId) {
    return {
      success: false,
      message: "Neautorizovaný prístup.",
    };
  }

  const { role } = await auth.api.getActiveMemberRole({
    headers: await headers(),
  });

  if (role !== "owner") {
    return {
      success: false,
      message: "Nemáte oprávnenie upraviť organizáciu.",
    };
  }
  try {
    await auth.api.removeMember({
      body: {
        memberIdOrEmail: memberEmail,
      },
      headers: await headers(),
    });
    return {
      success: true,
      message: "Člen bol úspešne odstránený.",
    };
  } catch (error) {
    console.error("Error removing member", error);
    return {
      success: false,
      message: "Chyba pri odstraňovaní člena.",
    };
  }
};

export const changeMemberRoleAction = async (
  memberId: string,
  newRole: string,
) => {
  const session = await getSession();

  if (!session || !session.session.activeOrganizationId) {
    return {
      success: false,
      message: "Neautorizovaný prístup.",
    };
  }

  const { role } = await auth.api.getActiveMemberRole({
    headers: await headers(),
  });

  if (role !== "owner") {
    return {
      success: false,
      message: "Nemáte oprávnenie upraviť organizáciu.",
    };
  }

  try {
    await auth.api.updateMemberRole({
      body: {
        role: newRole,
        memberId: memberId,
      },
      headers: await headers(),
    });
    console.log(`Role for member ${memberId} changed to ${newRole}`);
    return {
      success: true,
      message: "Rola člena bola úspešne zmenená.",
    };
  } catch (error) {
    console.error("Error changing member role", error);
    return {
      success: false,
      message: "Chyba pri zmene role člena.",
    };
  }
};
