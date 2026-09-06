import { Prisma } from "@/generated/prisma/client";

export type UserPageDataType = Prisma.UserGetPayload<{
  include: {
    sessions: {
      orderBy: { createdAt: "desc" };
      take: 1;
    };
    members: {
      select: {
        id: true;
        role: true;
        organization: {
          select: {
            id: true;
            name: true;
            slug: true;
            email: true;
            city: true;
          };
        };
        folders: {
          orderBy: { createdAt: "desc" };
          take: 5;
        };
      };
    };
  };
}>;
