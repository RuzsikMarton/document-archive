"use server";

import { prisma } from "@/lib/prisma";
import { CreateCompanyInput } from "@/types/company";
import { getSession } from "@/utils/auth";
import { newCompanySchema } from "@/utils/validation/company";

export const createCompanyAction = async (data: CreateCompanyInput) => {
  const session = await getSession();

  if (!session || session.user.role !== "ADMIN") {
    return {
      success: false,
      message: "Nemáte oprávnenie na tento úkon.",
    };
  }

  const parsedData = newCompanySchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: "Neplatné údaje.",
    };
  }

  try {
    const company = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: parsedData.data.name,
          ownerId: parsedData.data.ownerId,
        },
      });

      await tx.user.update({
        where: { id: parsedData.data.ownerId },
        data: {
          companyId: company.id,
          companyRole: "OWNER",
        },
      });
      return company;
    });
    return {
      success: true,
      company,
    };
  } catch (error) {
    console.error("Error creating company:", error);
    return {
      success: false,
      message: "Chyba pri vytváraní spoločnosti.",
    };
  }
};
