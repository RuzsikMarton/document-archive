"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/utils/auth";
import { updateProfileSchema } from "@/utils/validation/profile";
import { revalidatePath } from "next/cache";

export const changeUserDataAdmin = async ({
  id,
  name,
  email,
}: {
  id: string;
  name?: string;
  email?: string;
}) => {
  if (!(await isAdmin())) {
    return {
      success: false,
      message: "Nepovolená akcia",
    };
  }

  const parsedData = updateProfileSchema.safeParse({ name, email });

  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      email: true,
    },
  });

  if (!existingUser) {
    return {
      success: false,
      message: "Používateľ neexistuje.",
    };
  }

  try {
    const data: {
      name?: string;
      email?: string;
      emailVerified?: boolean;
    } = {};

    if (parsedData.data.name !== undefined) {
      data.name = parsedData.data.name;
    }

    if (
      parsedData.data.email !== undefined &&
      parsedData.data.email !== existingUser.email
    ) {
      data.email = parsedData.data.email;
      data.emailVerified = false;
    }

    await prisma.user.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}`);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Nepodarilo sa zmeniť údaje používateľa",
    };
  }
};

export const changeUserRoleAdmin = async (
  userId: string,
  newRole: "USER" | "ADMIN",
) => {
  if (!(await isAdmin())) {
    return {
      success: false,
      message: "Nepovolená akcia",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "Rola používateľa bola úspešne zmenená",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nepodarilo sa zmeniť rolu používateľa",
    };
  }
};

export const resetPasswordAdmin = async (email: string) => {
  if (!(await isAdmin())) {
    return {
      success: false,
      message: "Nepovolená akcia",
    };
  }

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      },
    });

    return {
      success: true,
      message: "Odkaz na resetovanie hesla bol odoslaný na email",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nepodarilo sa resetovať heslo používateľa",
    };
  }
};

export const deleteUserAdmin = async (userId: string) => {
  if (!(await isAdmin())) {
    return {
      success: false,
      message: "Nepovolená akcia",
    };
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "Používateľ bol úspešne zmazaný",
    };
  } catch (error) {
    return {
      success: false,
      message: "Nepodarilo sa zmazať používateľa",
    };
  }
};
