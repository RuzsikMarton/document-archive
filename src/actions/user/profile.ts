"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/auth";
import {
  changePasswordSchema,
  updateProfileSchema,
} from "@/utils/validation/profile";
import { headers } from "next/headers";
import z from "zod";

export const updateProfileAction = async (
  name: string,
  email?: string,
  telephone?: string,
) => {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "Neautorizovaný prístup." };
  }

  const parsedData = updateProfileSchema.safeParse({ name, email, telephone });

  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }

  try {
    const data: {
      name: string;
      email?: string;
      emailVerified?: boolean;
      telephone?: string;
    } = {
      name: parsedData.data.name,
      telephone: parsedData.data.telephone,
    };

    if (email !== undefined) {
      if (session.user.emailVerified) {
        return {
          success: false,
          message: "Overený email nie je možné zmeniť.",
        };
      }

      if (email !== session.user.email) {
        data.email = email;
        data.emailVerified = false;
      }
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating profile:", error);

    return {
      success: false,
      message: "Nepodarilo sa aktualizovať profil.",
    };
  }
};

export const updateProfilePictureAction = async (
  userId: string,
  pictureUrl: string,
) => {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "Neautorizovaný prístup." };
  }

  if (session.user.id !== userId || session.user.role !== "ADMIN") {
    return {
      success: false,
      message:
        "Nemáte oprávnenie na aktualizáciu profilovej fotky tohto používateľa.",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: pictureUrl,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return {
      success: false,
      message: "Nepodarilo sa aktualizovať profilovú fotku.",
    };
  }
};

export const changePasswordAction = async (
  formData: z.infer<typeof changePasswordSchema>,
) => {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "Neautorizovaný prístup." };
  }

  const parsedData = changePasswordSchema.safeParse(formData);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }

  try {
    await auth.api.changePassword({
      body: {
        currentPassword: parsedData.data.currentPassword,
        newPassword: parsedData.data.newPassword,
        revokeOtherSessions: false,
      },
      headers: await headers(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error changing password:", error);
    return { success: false, message: "Nepodarilo sa zmeniť heslo." };
  }
};

export const deleteOwnAccountAction = async () => {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "Neautorizovaný prístup." };
  }

  if (session.user.role === "ADMIN") {
    return { success: false, message: "Nemôžete vymazať účet administrátora." };
  }

  try {
    await prisma.user.delete({
      where: { id: session.user.id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { success: false, message: "Nepodarilo sa vymazať účet." };
  }
};
