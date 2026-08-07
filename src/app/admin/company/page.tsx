import CompaniesTable from "@/components/admin/companies-table";
import { requireAdmin } from "@/utils/auth";

const AdminCompanyPage = async () => {
  await requireAdmin("/admin/company");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full">
      <CompaniesTable />
    </main>
  );
};

export default AdminCompanyPage;
