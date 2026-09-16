import PublicFolderView from "@/components/folders/public-folder";
import FolderEditForm from "@/components/forms/folder-edit-form";
import SiteHeader from "@/components/layout/site-header";
import { getFolderById } from "@/lib/data/get-folders";
import { getSession } from "@/utils/auth";
import { notFound } from "next/navigation";

const FolderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await getSession();
  const { id } = await params;
  const data = await getFolderById(id);

  if (!data) {
    notFound();
  }
  const isAuthenticated = !!session?.session;
  const isOrganizationMember =
    session?.session.activeOrganizationId === data.organizationId;

  return (
    <>
      {isAuthenticated && (
        <SiteHeader
          showBackButton={{
            href: "/folders",
            text: "Späť na zoznam",
          }}
        />
      )}

      {isOrganizationMember ? (
        <FolderEditForm
          folder={data}
          activeOrganizationId={session?.session.activeOrganizationId}
        />
      ) : (
        <PublicFolderView isLoggedIn={isAuthenticated} folder={data} />
      )}
    </>
  );
};

export default FolderPage;
