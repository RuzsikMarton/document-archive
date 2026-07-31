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

// Validation schema for editing a folder
export const EditFolderSchema = z
  .object({
    name: z
      .string()
      .min(1, "Názov je povinný.")
      .max(30, "Názov môže mať maximálne 30 znakov."),
    year: z
      .number()
      .min(1900, "Rok musí byť platný.")
      .max(new Date().getFullYear() + 1, "Rok musí byť platný"),
    monthFrom: z
      .number()
      .min(1, "Mesiac musí byť medzi 1-12")
      .max(12, "Mesiac musí byť medzi 1-12")
      .optional(),
    monthTo: z
      .number()
      .min(1, "Mesiac musí byť medzi 1-12")
      .max(12, "Mesiac musí byť medzi 1-12")
      .optional(),
    contents: z.string().optional(),
  })
  .transform((data) => {
    if (data.monthFrom && !data.monthTo) {
      data.monthTo = data.monthFrom;
    }

    if (!data.monthFrom && data.monthTo) {
      data.monthFrom = data.monthTo;
    }

    return data;
  })
  .refine(
    (data) => {
      return !data.monthFrom || !data.monthTo || data.monthFrom <= data.monthTo;
    },
    {
      message: "Mesiac od musí byť menší alebo rovný mesiacu do.",
      path: ["monthFrom"],
    },
  );
