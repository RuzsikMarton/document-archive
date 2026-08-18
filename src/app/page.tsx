import Dashboard from "@/components/Dashboard";
import HomeLanding from "@/components/home-landing";
import NoCompany from "@/components/layout/no-company";
import SiteHeader from "@/components/layout/site-header";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardFolder } from "@/types/folder";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let folders: DashboardFolder[] | null = [];
  let stats = {
    total: 0,
    handedOver: 0,
    notHandedOver: 0,
  };

  if (session && session.session.activeOrganizationId) {
    folders = await prisma.folder.findMany({
      where: {
        userId: session.user.id,
        organizationId: session.session.activeOrganizationId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      take: 5,
    });

    const now = new Date();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

    // Get stats
    const [total, handedOver, notHandedOver] = await Promise.all([
      prisma.folder.count({
        where: {
          userId: session.user.id,
          organizationId: session.session.activeOrganizationId,
        },
      }),
      prisma.folder.count({
        where: {
          userId: session.user.id,
          organizationId: session.session.activeOrganizationId,
          handedOver: true,
          handedOverAt: {
            gte: startOfYear,
            lt: startOfNextYear,
          },
        },
      }),
      prisma.folder.count({
        where: {
          userId: session.user.id,
          organizationId: session.session.activeOrganizationId,
          handedOver: false,
        },
      }),
    ]);

    stats = { total, handedOver, notHandedOver };
  }

  return (
    <>
      {session ? (
        session.session.activeOrganizationId ||
        session.user.role === "ADMIN" ? (
          <>
            <SiteHeader title="Informačný panel" />
            <div className="flex min-h-[calc(100vh-4rem)] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <Dashboard folders={folders} stats={stats} />
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
