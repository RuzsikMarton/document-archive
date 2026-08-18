import SiteHeader from "@/components/layout/site-header";
import EmployeeOrganization from "@/components/organization/employee-organization";
import OwnerOrganization from "@/components/organization/owner-organization";
import { getOrganizationStats } from "@/lib/data/get-organization";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/utils/auth";
import { redirect } from "next/navigation";

const OrganizationPage = async () => {
  const session = await requireAuth("/organization");
  let stats = null;

  if (!session.session.activeOrganizationId) {
    redirect("/");
  }

  const organization = await prisma.organization.findUnique({
    where: { id: session.session.activeOrganizationId },
  });

  if (!organization) {
    redirect("/");
  }

  if (session.user.organization?.role === "owner") {
    stats = await getOrganizationStats();
  }

  return (
    <>
      {session.session && <SiteHeader title="Organizácia" />}
      <div className="flex px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {session.user.organization?.role === "owner" ? (
          <OwnerOrganization organization={organization} stats={stats} />
        ) : (
          <EmployeeOrganization organization={organization} />
        )}
      </div>
    </>
  );
};

export default OrganizationPage;
