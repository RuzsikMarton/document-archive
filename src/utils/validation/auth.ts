import * as z from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Zadajte platný e-mail." }),
  password: z
    .string()
    .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
    .trim(),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Meno je povinné." })
      .max(50, { message: "Meno môže mať maximálne 50 znakov." })
      .trim(),
    email: z.email({ message: "Zadajte platný e-mail." }),
    password: z
      .string()
      .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
      .max(16, { message: "Heslo môže mať maximálne 16 znakov." })
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/, {
        message:
          "Heslo musí obsahovať aspoň 1 veľké písmeno, 1 malé písmeno a 1 číslo.",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
      .max(16, { message: "Heslo môže mať maximálne 16 znakov." })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Heslá sa nezhodujú.",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
      .max(16, { message: "Heslo môže mať maximálne 16 znakov." })
      .trim(),
    newPassword: z
      .string()
      .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
      .max(16, { message: "Heslo môže mať maximálne 16 znakov." })
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/, {
        message:
          "Heslo musí obsahovať aspoň 1 veľké písmeno, 1 malé písmeno a 1 číslo.",
      })
      .trim(),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
      .max(16, { message: "Heslo môže mať maximálne 16 znakov." })
      .trim(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Heslá sa nezhodujú.",
    path: ["confirmNewPassword"],
  });

const resetPasswordSchema = z.object({
  email: z.email({ message: "Zadajte platný e-mail." }),
});

const resetPasswordConfirmSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
      .max(16, { message: "Heslo môže mať maximálne 16 znakov." })
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/, {
        message:
          "Heslo musí obsahovať aspoň 1 veľké písmeno, 1 malé písmeno a 1 číslo.",
      })
      .trim(),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
      .max(16, { message: "Heslo môže mať maximálne 16 znakov." })
      .trim(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Heslá sa nezhodujú.",
    path: ["confirmNewPassword"],
  });
