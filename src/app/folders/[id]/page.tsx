import { prisma } from "@/lib/prisma";

const FolderPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await prisma.folder.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <div>
      <p>ID: {data?.id}</p>
      <p>Name: {data?.name}</p>
      <p>Year: {data?.year}</p>
      <img src={data?.qrCodeImage || ""} alt="QR Code" />
    </div>
  );
};

export default FolderPage;
