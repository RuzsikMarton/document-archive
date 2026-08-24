import { Role } from "@/generated/prisma/enums";

export type PublicSession = {
  user?: {
    id: string;
    name: string;
  };
  role?: Role;
};

type SessionOrganization = {
  id: string;
  name: string;
  slug: string;
  role: string;
  memberId: string;
};

export type SessionUserType = {
  role: Role | undefined;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
  organization: SessionOrganization | null;
};

export interface SignUpFormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
}
