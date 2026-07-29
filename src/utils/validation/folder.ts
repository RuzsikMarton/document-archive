import { z } from "zod";

export const CreateFolderSchema = z.object({
  name: z
    .string()
    .min(1, "Názov je povinný.")
    .max(30, "Názov môže mať maximálne 30 znakov."),
  year: z
    .number()
    .min(1900, "Rok musí byť platný.")
    .max(new Date().getFullYear(), "Rok musí byť platný"),
});
