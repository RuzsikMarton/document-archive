import { Role } from "@/generated/prisma/enums";

export type PublicSession = {
  user: {
    id: string;
    name: string;
  };
  role: Role;
};
