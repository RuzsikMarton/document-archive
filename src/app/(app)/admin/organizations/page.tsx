import OrganizationsTable from "@/components/admin/organizations-admin-table";
import SiteHeader from "@/components/layout/site-header";
import { getAdminDataOrganizations } from "@/lib/data/get-admin-data";
import { requireAdmin } from "@/utils/auth";

const AdminOrganizationsPage = async (props: {
  searchParams?: Promise<{ search?: string; page?: number }>;
}) => {
  await requireAdmin("/admin/organizations");
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page ?? 1);
  const search = searchParams?.search ?? "";

  const { data, totalCount } = await getAdminDataOrganizations({
    search,
    page,
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] mx-auto">
      <SiteHeader title="Organizácie" />
      <div className="flex flex-col w-full justify-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 gap-2">
        <OrganizationsTable
          data={data || []}
          totalCount={totalCount || 0}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default AdminOrganizationsPage;
