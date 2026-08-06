"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/auth";
import {
  changePasswordSchema,
  updateProfileEmailSchema,
  updateProfileNameSchema,
} from "@/utils/validation/profile";
import { headers } from "next/headers";
import z from "zod";

export const updateProfileAction = async (name: string) => {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "Neautorizovaný prístup." };
  }

  const parsedData = updateProfileNameSchema.safeParse({ name });

  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, message: "Nepodarilo sa aktualizovať profil." };
  }
};

export const updateEmailAction = async (email: string) => {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "Neautorizovaný prístup." };
  }

  const parsedData = updateProfileEmailSchema.safeParse({ email });

  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { email },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, message: "Nepodarilo sa aktualizovať email." };
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
        revokeOtherSessions: true,
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

  if (session.role === "ADMIN") {
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
