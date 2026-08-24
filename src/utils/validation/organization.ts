import z from "zod";

export const newOrganizationSchema = z.object({
  name: z.string().min(1, "Názov spoločnosti je povinný"),
  slug: z.string().min(1, "Slug spoločnosti je povinný"),
  ownerId: z
    .string()
    .min(1, "ID vlastníka je povinné")
    .min(32, "ID vlastníka musí mať 32 znakov")
    .max(32, "ID vlastníka musí mať 32 znakov"),
});

export const sendInvitationSchema = z.object({
  email: z.email("Zadajte platnú e-mailovú adresu."),
});

export const editOrganizationSchema = z.object({
  name: z.string().min(1, "Názov spoločnosti je povinný"),
  ico: z
    .string()
    .regex(/^\d{8}$/, "IČO musí obsahovať 8 číslic.")
    .optional()
    .or(z.literal("")),

  dic: z
    .string()
    .regex(/^\d{10}$/, "DIČ musí obsahovať 10 číslic.")
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .min(2, "Mesto musí obsahovať aspoň 2 znaky.")
    .max(100, "Mesto môže obsahovať maximálne 100 znakov.")
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .min(2, "Adresa musí obsahovať aspoň 2 znaky.")
    .max(200, "Adresa môže obsahovať maximálne 200 znakov.")
    .optional()
    .or(z.literal("")),

  postalCode: z
    .string()
    .regex(/^\d{3}\s?\d{2}$/, "PSČ musí mať formát 941 10.")
    .optional()
    .or(z.literal("")),

  telephone: z
    .string()
    .min(6, "Telefónne číslo je príliš krátke.")
    .max(20, "Telefónne číslo je príliš dlhé.")
    .optional()
    .or(z.literal("")),

  email: z
    .email("Zadajte platnú e-mailovú adresu.")
    .max(254, "E-mailová adresa je príliš dlhá.")
    .optional()
    .or(z.literal("")),

  website: z
    .url("Zadajte platnú URL adresu.")
    .max(255, "Webová stránka je príliš dlhá.")
    .optional()
    .or(z.literal("")),
});
