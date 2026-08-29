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

  if (role !== "owner" && role !== "admin") {
    return {
      success: false,
      message: "Nemáte oprávnenie upraviť organizáciu.",
    };
  }

  if (memberEmail === session.user.email) {
    return {
      success: false,
      message: "Nemôžete odstrániť sami seba.",
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

export const inviteMemberAction = async (
  email: string,
  organizationId?: string,
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

  if (role !== "owner" && role !== "admin") {
    return {
      success: false,
      message: "Nemáte oprávnenie pozvať člena.",
    };
  }

  const existingMember = await prisma.member.findFirst({
    where: {
      user: {
        email: email,
      },
    },
    select: {
      id: true,
      organizationId: true,
    },
  });

  if (existingMember) {
    return {
      success: false,
      message: "Tento používateľ už patrí do organizácie.",
    };
  }

  try {
    await auth.api.createInvitation({
      body: {
        email: email,
        role: "member",
        organizationId: organizationId,
        resend: true,
      },
      headers: await headers(),
    });
    return {
      success: true,
      message: "Pozvánka bola úspešne odoslaná.",
    };
  } catch (error) {
    console.error("Error inviting member", error);
    return {
      success: false,
      message: "Chyba pri odosielaní pozvánky.",
    };
  }
};

export const cancelInvitationAction = async (invitationId: string) => {
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

  if (role !== "owner" && role !== "admin") {
    return {
      success: false,
      message: "Nemáte oprávnenie zrušiť pozvánku.",
    };
  }

  try {
    await auth.api.cancelInvitation({
      body: {
        invitationId: invitationId,
      },
      headers: await headers(),
    });
    return {
      success: true,
      message: "Pozvánka bola úspešne zrušená.",
    };
  } catch (error) {
    console.error("Error canceling invitation", error);
    return {
      success: false,
      message: "Chyba pri rušení pozvánky.",
    };
  }
};
