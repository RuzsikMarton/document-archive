import { CompanyRole, Role } from "@/generated/prisma/enums";

export type PublicSession = {
  user?: {
    id: string;
    name: string;
  };
  role?: Role;
};

export type SidebarUserType = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: Role;
  companyId?: string | null;
  companyRole?: CompanyRole | null;
  companyName: string | null;
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
