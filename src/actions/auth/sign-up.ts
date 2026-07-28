"use server";

import { auth } from "@/lib/auth";
import { SignUpFormValues } from "@/types/auth";
import { signUpSchema } from "@/utils/validation/auth";

export const signUpAction = async (formData: SignUpFormValues) => {
  const parsedData = signUpSchema.safeParse(formData);
  if (!parsedData.success) {
    return {
      success: false,
      message:
        "Neplatné údaje vo formulári. Skontrolujte prosím zadané informácie.",
    };
  }

  const { email, name, password } = parsedData.data;

  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    });
    return { success: true };
  } catch (error: any) {
    if (error?.message?.toLowerCase().includes("email")) {
      return {
        success: false,
        message: "Email je už registrovaný. Skúste sa prihlásiť.",
      };
    }
    return {
      success: false,
      message: "Neznáma chyba. Prosim skúste to znova neskôr.",
    };
  }
};
