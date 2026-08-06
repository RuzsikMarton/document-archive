import z from "zod";

export const updateProfileNameSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Meno je povinné." })
    .max(50, { message: "Meno môže mať maximálne 50 znakov." })
    .trim(),
});

export const updateProfileEmailSchema = z.object({
  email: z
    .email({ message: "Neplatný formát e-mailu." })
    .max(100, { message: "E-mail môže mať maximálne 100 znakov." })
    .trim(),
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
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Nové heslo musí byť odlišné od aktuálneho hesla.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Heslá sa nezhodujú.",
    path: ["confirmNewPassword"],
  });
