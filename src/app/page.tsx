import Dashboard from "@/components/dashboard";
import HomeLanding from "@/components/home-landing";
import NoCompany from "@/components/layout/no-company";
import SiteHeader from "@/components/layout/site-header";
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
    <>
      {session ? (
        session.user.companyId || session.user.role === "ADMIN" ? (
          <>
            <SiteHeader title="Informačný panel" />
            <div className="flex min-h-[calc(100vh-4rem)] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <Dashboard folders={folders} />
            </div>
          </>
        ) : (
          <>
            <SiteHeader title="Informačný panel" />
            <div className="flex min-h-[calc(100vh-4rem)] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <div className="flex flex-col items-center justify-center w-full">
                <NoCompany />
              </div>
            </div>
          </>
        )
      ) : (
        <div className="flex min-h-[calc(100vh-4rem)] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-col items-center justify-center w-full">
            <HomeLanding />
          </div>
        </div>
      )}
    </>
  );
}
