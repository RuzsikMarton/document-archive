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

  return (
    <>
      {session?.session && (
        <SiteHeader showButton={{ href: "/folders", text: "Späť na zoznam" }} />
      )}
      <FolderEditForm folder={data} />
    </>
  );
};

export default FolderPage;
