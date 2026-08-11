import CompaniesTable from "@/components/admin/companies-table";
import { requireAdmin } from "@/utils/auth";

const AdminCompanyPage = async () => {
  await requireAdmin("/admin/company");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <CompaniesTable />
    </div>
  );
};

export default AdminCompanyPage;
