"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  type RowData,
  type SortingState,
  useTable,
} from "@tanstack/react-table";
import { SearchX } from "lucide-react";
import { useState } from "react";
import { DataTableFeatures, features } from "./data-table-features";

interface FoldersDataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  sortOrder: "asc" | "desc";
}

export function FoldersDataTable<TData extends RowData>({
  columns,
  data,
}: FoldersDataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useTable({
    data,
    columns,
    features,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-slate-900 dark:text-slate-50 px-4 sm:px-6 py-3 sm:py-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="divide-y divide-slate-100 dark:divide-slate-700">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 sm:px-6 py-4 sm:py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-700/50 border-0">
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-slate-500 dark:text-slate-400 px-4 sm:px-6 py-3 sm:py-4"
              >
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
