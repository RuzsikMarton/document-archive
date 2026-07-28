import Dashboard from "@/components/Dashboard";
import HomeLanding from "@/components/HomeLanding";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      {session ? <Dashboard /> : <HomeLanding />}
    </main>
  );
}
