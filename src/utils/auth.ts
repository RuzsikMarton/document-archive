import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

//redirect function for protected routes
export async function requireAuth(path: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(path)}`);
  }

  return session;
}

export async function isAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.role === "ADMIN";
}
