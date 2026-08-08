import FolderEditForm from "@/components/forms/folder-edit-form";
import { getFolderById } from "@/lib/data/get-folders";
import { notFound } from "next/navigation";

const FolderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getFolderById(id);

  if (!data) {
    notFound();
  }

  return (
    <div>
      <FolderEditForm folder={data} />
    </div>
  );
};

export default FolderPage;
