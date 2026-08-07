import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";
import { auth } from "./auth";
export const authClient = createAuthClient({
  plugins: [customSessionClient<typeof auth>()],
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  basePath: "/api/auth",
});

export const { signUp, signIn, signOut, useSession } = authClient;
