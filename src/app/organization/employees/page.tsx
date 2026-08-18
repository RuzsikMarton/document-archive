import SiteHeader from "@/components/layout/site-header";
import { requireAuth } from "@/utils/auth";
import { redirect } from "next/navigation";

const OrganizationEmployees = async () => {
  const session = await requireAuth("/organization/employees");

  if (session.user.organization?.role !== "owner") {
    redirect("/");
  }
  return (
    <>
      <SiteHeader title="Zamestnanci" />
      <div className="flex-center flex-col container min-h-[92vh]">
        <p className="font-semibold text-xl text-primary/80">
          Stránka je work in progress
        </p>
        <p className="font-medium text-muted-foreground">
          Bude čoskoro dostupná
        </p>
      </div>
    </>
  );
};

export default OrganizationEmployees;
