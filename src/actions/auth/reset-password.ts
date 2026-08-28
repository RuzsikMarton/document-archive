"use server";

import { auth } from "@/lib/auth";
import { resetPasswordValidationSchema } from "@/utils/validation/auth";

export const resetPasswordAction = async (
  token: string,
  data: {
    password: string;
    confirmPassword: string;
  },
) => {
  const parsedData = resetPasswordValidationSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message:
        "Nesprávne údaje. Skontrolujte prosím formulár a skúste to znova.",
    };
  }

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: parsedData.data.password,
        token,
      },
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return {
      success: false,
      message: "Nastala chyba. Skúste to znova.",
    };
  }
  return {
    success: true,
  };
};
