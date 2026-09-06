import { requireAdmin } from "@/utils/auth";
import { getAdminDataUsers } from "@/lib/data/get-admin-data";
import TablePagination from "@/components/common/table-pagination";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import SiteHeader from "@/components/layout/site-header";
import UsersAdminTableFilters from "@/components/admin/users-admin-table-filter";

const AdminUsersPage = async (props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    role?: "ADMIN" | "USER";
    inOrganization?: "in" | "out";
  }>;
}) => {
  await requireAdmin("/admin/users");
  const searchParams = await props.searchParams;
  const search = searchParams?.search;
  const page = Number(searchParams?.page ?? 1);
  const role = searchParams?.role?.toUpperCase() as "ADMIN" | "USER";
  const inOrganization = searchParams?.inOrganization;
  const { totalCount, data: users } = await getAdminDataUsers({
    search,
    page: Number(page),
    role,
    inOrganization,
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] mx-auto">
      <SiteHeader title="Správa používateľov" />
      <div className="flex flex-col w-full justify-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 gap-2">
        <UsersAdminTableFilters />
        <DataTable columns={columns} data={users || []} />
        <div className="mx-auto">
          <TablePagination
            page={page}
            totalCount={totalCount || 0}
            pageSize={20}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
