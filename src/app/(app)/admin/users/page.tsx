import { requireAdmin } from "@/utils/auth";

const AdminUsersPage = async () => {
  const session = await requireAdmin("/admin/users");
  return (
    <div className="flex-center min-h-screen md:min-h-[calc(100vh-4rem)] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 mx-auto">
      AdminUsersPage
    </div>
  );
};

export default AdminUsersPage;
