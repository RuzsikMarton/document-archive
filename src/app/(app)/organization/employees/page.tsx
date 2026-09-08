import SiteHeader from "@/components/layout/site-header";
import {
  getOrganizationEmployees,
  getPendingInvitations,
} from "@/lib/data/get-organization";
import { isOrganizationAdmin, requireAuth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import TablePagination from "@/components/common/table-pagination";
import EmployeesHeader from "@/components/organization/employees-header";
import PendingInvitationsTable from "@/components/organization/pending-invitations-table";
import { DataTable } from "@/components/ui/data-table";

const OrganizationEmployees = async (props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) => {
  const session = await requireAuth("/organization/employees");

  if (!isOrganizationAdmin(session.user.organization?.role)) {
    redirect("/");
  }

  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const page = searchParams?.page || "1";

  const { employees, totalCount } = await getOrganizationEmployees({
    search,
    page: Number(page),
  });

  const { invitations } = await getPendingInvitations();

  return (
    <>
      <SiteHeader title="Zamestnanci" />
      <div className="flex flex-col min-h-[92vh] p-4 md:px-6 md:py-6 lg:px-8 items-center">
        <EmployeesHeader organizationId={session.user.organization?.id} />
        <DataTable columns={columns} data={employees ?? []} />
        <TablePagination
          page={Number(page)}
          totalCount={Number(totalCount)}
          pageSize={10}
        />
        <PendingInvitationsTable invitations={invitations} />
      </div>
    </>
  );
};

export default OrganizationEmployees;
