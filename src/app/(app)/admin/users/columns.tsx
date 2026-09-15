"use client";

import { DataTableFeatures } from "@/components/ui/data-table-features";
import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";
import type { AdminUsers } from "@/types/admin";
import UsersAdminTableDropdown from "@/components/admin/users-admin-table-dropdown";

const columnHelper = createColumnHelper<DataTableFeatures, AdminUsers>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: () => (
      <div className="font-semibold text-slate-900 dark:text-slate-50">
        Názov
      </div>
    ),
    cell: ({ row }) => {
      return (
        <Link
          href={`/users/${row.original.id}`}
          className="font-medium underline underline-offset-4 text-slate-900 dark:text-slate-50"
        >
          {row.getValue("name")}
        </Link>
      );
    },
  }),
  columnHelper.accessor("email", {
    header: () => (
      <div className="max-w-10 font-semibold text-slate-900 dark:text-slate-50">
        Email
      </div>
    ),
    size: 10,
    cell: ({ row }) => {
      return (
        <div className="w-full truncate text-slate-900 dark:text-slate-50">
          {row.getValue("email")}
        </div>
      );
    },
  }),
  columnHelper.accessor("telephone", {
    header: () => (
      <div className="max-w-10 font-semibold text-slate-900 dark:text-slate-50">
        Telefón
      </div>
    ),
    size: 10,
    cell: ({ row }) => {
      return (
        <div className="w-full truncate text-slate-900 dark:text-slate-50">
          {row.getValue("telephone") || "-"}
        </div>
      );
    },
  }),
  columnHelper.accessor("role", {
    header: () => (
      <div className="font-semibold text-slate-900 dark:text-slate-50">
        Rola
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-slate-900 dark:text-slate-50">
          {row.getValue("role")}
        </div>
      );
    },
  }),
  columnHelper.accessor("members", {
    header: () => (
      <div className="font-semibold text-slate-900 dark:text-slate-50">
        Organizácie
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-slate-900 dark:text-slate-50">
          {row.original.members.length || "-"}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",

    cell: ({ row }) => {
      const user = row.original;

      return <UsersAdminTableDropdown user={user} />;
    },
  }),
]);
