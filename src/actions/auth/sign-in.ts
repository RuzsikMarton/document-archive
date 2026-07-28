"use server";

import { auth } from "@/lib/auth";
import { SignInFormValues } from "@/types/auth";
import { signInSchema } from "@/utils/validation/auth";

export const signInAction = async (formData: SignInFormValues) => {
  const parsedData = signInSchema.safeParse(formData);
  if (!parsedData.success) {
    return {
      success: false,
      message:
        "Neplatné údaje vo formulári. Skontrolujte prosím zadané informácie.",
    };
  }

  const { email, password } = parsedData.data;

  try {
    await auth.api.signInEmail({
      body: { email, password },
    });
    return { success: true };
  } catch (error: any) {
    if (error?.message?.toLowerCase().includes("password")) {
      return {
        success: false,
        message: "Nesprávny email alebo heslo. Skúste to znova.",
      };
    }
    return {
      success: false,
      message: "Neznáma chyba. Prosím skúste to znova neskôr.",
    };
  }
};
