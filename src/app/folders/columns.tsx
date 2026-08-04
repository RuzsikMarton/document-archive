"use client";

import FolderTableActions from "@/components/folders/FolderTableActions";
import SortableHeader from "@/components/folders/SortableHeader";
import { Button } from "@/components/ui/button";
import { Folder } from "@/generated/prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export const columns: ColumnDef<Folder>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="font-semibold text-slate-900 dark:text-slate-50">
        Názov
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium text-slate-900 dark:text-slate-50">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "year",
    header: () => (
      <div className="font-semibold text-slate-900 dark:text-slate-50">Rok</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-slate-600 dark:text-slate-400">
          {row.getValue("year")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      const sort = column.getIsSorted();
      return (
        <div className="hidden md:block">
          <SortableHeader title="Dátum vytvorenia" sortKey="createdAt" />
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = new Intl.DateTimeFormat("sk-SK", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
      return (
        <div className="hidden md:block text-sm text-slate-600 dark:text-slate-400">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "handedOver",
    header: () => (
      <div className="font-semibold text-slate-900 dark:text-slate-50">
        Odovzdané
      </div>
    ),
    cell: ({ row }) => {
      const isHandedOver = row.getValue("handedOver") as boolean;
      return (
        <div className="flex items-center">
          <span
            className={
              isHandedOver
                ? "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border border-green-700/75 bg-green-50 text-green-700 dark:border-green-400 dark:bg-green-950 dark:text-green-400"
                : "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border border-slate-500/75 bg-slate-100 text-slate-700 dark:border-slate-400 dark:bg-slate-700 dark:text-slate-300"
            }
          >
            {isHandedOver ? (
              <>
                <CheckCircle2 className="h-3 w-3" />
                Áno
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3" />
                Nie
              </>
            )}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className="text-right font-semibold text-slate-900 dark:text-slate-50">
        Akcie
      </div>
    ),
    cell: ({ row }) => {
      const folder = row.original;
      const isHandedOver = row.getValue("handedOver") as boolean;

      return <FolderTableActions folder={folder} isHandedOver={isHandedOver} />;
    },
  },
];
