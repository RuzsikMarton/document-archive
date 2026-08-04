import { getSession } from "@/utils/auth";
import { prisma } from "../prisma";

export const GetFolders = async ({
  search,
  handedOver,
  years,
}: {
  search?: string;
  handedOver?: string;
  years?: string;
}) => {
  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "Neautorizovaný prístup. Prosím prihláste sa.",
    };
  }

  try {
    const folders = await prisma.folder.findMany({
      where: {
        userId: session.user.id,
        name: {
          contains: search || "",
          mode: "insensitive",
        },
        handedOver:
          handedOver === "true"
            ? true
            : handedOver === "false"
              ? false
              : undefined,
        year: years ? { in: years.split(",").map(Number) } : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: folders,
    };
  } catch (error) {
    console.error("Error fetching folders:", error);
    return {
      success: false,
      message: "Nastala chyba pri načítavaní priečinkov.",
    };
  }
};
