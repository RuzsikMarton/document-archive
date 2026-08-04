import { columns } from "@/app/folders/columns";
import { FoldersDataTable } from "@/app/folders/data-table";
import { GetFolders } from "@/lib/data/get-folders";

type Props = {
  search?: string;
  handedOver?: string;
  years?: string;
  currentPage?: number;
};

const FoldersTable = async (props: Props) => {
  const result = await GetFolders({
    search: props.search,
    handedOver: props.handedOver,
    years: props.years,
  });
  return (
    <div>
      <FoldersDataTable columns={columns} data={result.data || []} />
    </div>
  );
};

export default FoldersTable;
