import CompaniesTable from "@/components/admin/companies-table";
import { requireAdmin } from "@/utils/auth";

const AdminOrganizationsPage = async () => {
  await requireAdmin("/admin/organizations");
  return (
    <div className="flex-center min-h-screen md:min-h-[calc(100vh-4rem)] mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <CompaniesTable />
    </div>
  );
};

export default AdminOrganizationsPage;
