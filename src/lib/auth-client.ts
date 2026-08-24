import { createAuthClient } from "better-auth/react";
import {
  customSessionClient,
  organizationClient,
} from "better-auth/client/plugins";
import { auth } from "./auth";
export const authClient = createAuthClient({
  plugins: [customSessionClient<typeof auth>(), organizationClient()],
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  basePath: "/api/auth",
});

export const { signUp, signIn, signOut, useSession } = authClient;
