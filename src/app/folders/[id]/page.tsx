import { getFolderById } from "@/actions/folder/folder";
import FolderEditForm from "@/components/forms/FolderEditForm";
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
