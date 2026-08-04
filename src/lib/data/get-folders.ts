import { getSession } from "@/utils/auth";
import { prisma } from "../prisma";

export const GetFolders = async ({
  search,
  handedOver,
  years,
  currentPage,
  sortOrder,
}: {
  search?: string;
  handedOver?: string;
  years?: string;
  currentPage?: number;
  sortOrder?: "asc" | "desc";
}) => {
  const session = await getSession();
  const pageSize = 25;

  if (!session) {
    return {
      success: false,
      message: "Neautorizovaný prístup. Prosím prihláste sa.",
    };
  }

  const skip =
    currentPage && currentPage > 1 ? (currentPage - 1) * pageSize : 0;

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
        createdAt: sortOrder || "desc",
      },
      skip,
      take: pageSize,
    });

    const totalCount = await prisma.folder.count({
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
    });

    return {
      success: true,
      data: folders,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching folders:", error);
    return {
      success: false,
      message: "Nastala chyba pri načítavaní priečinkov.",
    };
  }
};
