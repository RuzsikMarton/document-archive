import { columns } from "@/app/folders/columns";
import { FoldersDataTable } from "@/app/folders/data-table";
import { GetFolders } from "@/lib/data/get-folders";
import TablePagination from "../common/table-pagination";

type Props = {
  search?: string;
  handedOver?: string;
  years?: string;
  page?: string;
  sortOrder?: "asc" | "desc";
};

const FoldersTable = async (props: Props) => {
  const result = await GetFolders({
    search: props.search,
    handedOver: props.handedOver,
    years: props.years,
    page: Number(props.page),
    sortOrder: props.sortOrder,
  });
  return (
    <div>
      <FoldersDataTable
        columns={columns}
        data={result.data || []}
        sortOrder={props.sortOrder || "desc"}
      />
      <TablePagination
        totalCount={result.totalCount || 0}
        pageSize={25}
        page={Number(props.page) || 1}
      />
    </div>
  );
};

export default FoldersTable;
