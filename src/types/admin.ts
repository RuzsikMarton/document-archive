import { Member, Organization, User } from "@/generated/prisma/client";

export type AdminUsers = User & {
  members: (Member & { organization: { name: string } })[];
};

export type AdminOrganizations = Organization & {
  _count: {
    members: number;
  };
};
