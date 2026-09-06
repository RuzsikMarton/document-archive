"use client";

import { type RowData, type ColumnDef, useTable } from "@tanstack/react-table";
import {
  features,
  type DataTableFeatures,
} from "@/components/ui/data-table-features";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchX } from "lucide-react";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
}

export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    data,
    columns,
    features,
  });

  return (
    <div className="overflow-hidden rounded border w-full bg-white dark:bg-slate-800">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="px-4 sm:px-6 py-3 sm:py-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : table.FlexRender({ header: header })}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className={
                      cell.column.id === "actions"
                        ? "px-2 py-2"
                        : "px-4 sm:px-6 py-2"
                    }
                  >
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center gap-1">
                  <SearchX className="w-5 h-5 my-2 text-slate-400 dark:text-slate-500" />
                  Žiadne výsledky.
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
