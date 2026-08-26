import z from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Meno je povinné." })
    .max(50, { message: "Meno môže mať maximálne 50 znakov." }),

  email: z
    .email({ message: "Neplatný formát e-mailu." })
    .trim()
    .max(100, { message: "E-mail môže mať maximálne 100 znakov." })
    .optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
      .max(16, { message: "Heslo môže mať maximálne 16 znakov." }),
    newPassword: z
      .string()
      .trim()
      .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
      .max(16, { message: "Heslo môže mať maximálne 16 znakov." })
      .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/, {
        message:
          "Heslo musí obsahovať aspoň 1 veľké písmeno, 1 malé písmeno a 1 číslo.",
      }),
    confirmNewPassword: z
      .string()
      .trim()
      .min(8, { message: "Heslo musí mať aspoň 8 znakov." })
      .max(16, { message: "Heslo môže mať maximálne 16 znakov." }),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Nové heslo musí byť odlišné od aktuálneho hesla.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Heslá sa nezhodujú.",
    path: ["confirmNewPassword"],
  });
