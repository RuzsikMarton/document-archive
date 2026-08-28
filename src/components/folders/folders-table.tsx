"use client";

import { columns } from "@/app/folders/columns";
import { FoldersDataTable } from "@/app/folders/data-table";
import { useState } from "react";
import TablePagination from "../common/table-pagination";
import { Folder } from "@/generated/prisma/client";
import TableFilters from "./table-filters";

type Props = {
  data: Folder[];
  totalCount: number;
  currentPage: number;
  sortOrder: "asc" | "desc";
};

const FoldersTable = (props: Props) => {
  const [rowSelection, setRowSelection] = useState({});
  const selectedFolders = props.data.filter((folder) =>
    Object.keys(rowSelection).includes(folder.id),
  );

  return (
    <div>
      <TableFilters selectedFolders={selectedFolders} />
      <FoldersDataTable
        columns={columns}
        data={props.data}
        sortOrder={props.sortOrder}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
      <TablePagination
        totalCount={props.totalCount}
        pageSize={25}
        page={props.currentPage}
        dataLength={props.data.length}
        selectedRowsCount={Object.keys(rowSelection).length}
      />
    </div>
  );
};

export default FoldersTable;
