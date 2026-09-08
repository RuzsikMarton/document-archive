import SiteHeader from "@/components/layout/site-header";
import UserDetailsCol from "@/components/user/user-details-column";
import UserFoldersCol from "@/components/user/user-folders-column";
import UserOrganizationCol from "@/components/user/user-organization-column";
import { getUsersById } from "@/lib/data/users";
import { requireAdmin } from "@/utils/auth";
import { notFound } from "next/navigation";

const UserDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await requireAdmin("/");
  const { id } = await params;
  const user = await getUsersById(id);
  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen md:min-h-[calc(100vh-4rem)] mx-auto">
      <SiteHeader
        title={`${user.name}`}
        showDate={false}
        showText={`Vytvorené ${new Date(user.createdAt).toLocaleDateString(
          "sk-SK",
          {
            weekday: "long",
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        )}`}
      />
      <div className="flex justify-center p-2 md:py-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl">
          <UserDetailsCol user={user} />
          <UserOrganizationCol user={user} />
          <div>
            <UserFoldersCol user={user} />
            {(session.user.role === "ADMIN" || session.user.id === user.id) && (
              <>{/* Some admin or user-specific action can go here */}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
