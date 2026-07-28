import { Role } from "@/generated/prisma/enums";

export type PublicSession = {
  user: {
    id: string;
    name: string;
  };
  role: Role;
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
