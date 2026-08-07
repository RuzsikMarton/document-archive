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

export async function requireCompanyMember(path = "/") {
  const session = await requireAuth(path);

  if (!session.user.companyId) {
    redirect("/");
  }

  return session;
}

export async function requireCompanyOwner(path = "/") {
  const session = await requireAuth(path);

  if (session.user.companyRole !== "OWNER") {
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

export async function isCompanyMember() {
  const session = await getSession();
  return !!session?.user.companyId;
}

export async function isCompanyOwner() {
  const session = await getSession();
  return session?.user.companyRole === "OWNER";
}
