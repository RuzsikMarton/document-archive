import z from "zod";

export const newCompanySchema = z.object({
  name: z.string().min(1, "Názov spoločnosti je povinný"),
  ownerId: z
    .string()
    .min(1, "ID vlastníka je povinné")
    .min(32, "ID vlastníka musí mať 32 znakov")
    .max(32, "ID vlastníka musí mať 32 znakov"),
});
