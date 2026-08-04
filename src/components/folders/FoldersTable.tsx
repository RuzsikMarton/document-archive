import { columns } from "@/app/folders/columns";
import { FoldersDataTable } from "@/app/folders/data-table";
import { GetFolders } from "@/lib/data/get-folders";
import FolderPagination from "./FolderPagination";

type Props = {
  search?: string;
  handedOver?: string;
  years?: string;
  currentPage?: string;
  sortOrder?: "asc" | "desc";
};

const FoldersTable = async (props: Props) => {
  const result = await GetFolders({
    search: props.search,
    handedOver: props.handedOver,
    years: props.years,
    currentPage: Number(props.currentPage),
    sortOrder: props.sortOrder,
  });
  return (
    <div>
      <FoldersDataTable
        columns={columns}
        data={result.data || []}
        sortOrder={props.sortOrder || "desc"}
      />
      <FolderPagination
        totalCount={result.totalCount || 0}
        pageSize={25}
        page={Number(props.currentPage) || 1}
      />
    </div>
  );
};

export default FoldersTable;
