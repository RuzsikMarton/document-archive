import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}

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

export async function requireAdmin(path = "/") {
  const session = await requireAuth(path);

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return session;
}

export async function isAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user.role === "ADMIN";
}

export function isOrganizationAdmin(role?: string) {
  return role === "owner" || role === "admin";
}

export function isOrganizationOwner(role?: string) {
  return role === "owner";
}

export function hasPermissionForAction(
  currentUserRole: string,
  targetMemberRole: string,
) {
  if (currentUserRole === "owner") {
    return targetMemberRole === "admin" || targetMemberRole === "member";
  }

  if (currentUserRole === "admin") {
    return targetMemberRole === "member";
  }

  return false;
}
