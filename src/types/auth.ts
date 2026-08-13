import { CompanyRole, Role } from "@/generated/prisma/enums";

export type PublicSession = {
  user?: {
    id: string;
    name: string;
  };
  role?: Role;
};

export type SessionUserType = {
  role: Role | undefined;
  companyId: string | null | undefined;
  companyRole: CompanyRole | null | undefined;
  companyName: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
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
