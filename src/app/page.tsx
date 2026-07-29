import Dashboard from "@/components/Dashboard";
import HomeLanding from "@/components/HomeLanding";
import { Folder } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let folders: Folder[] | null = [];
  if (session) {
    folders = await prisma.folder.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
  }

  return (
    <main className="flex min-h-screen md:min-h-[calc(100vh-4rem)] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {session ? (
        <Dashboard folders={folders} />
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <HomeLanding />
        </div>
      )}
    </main>
  );
}
