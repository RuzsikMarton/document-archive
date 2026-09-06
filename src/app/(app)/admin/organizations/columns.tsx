"use client";

import { DataTableFeatures } from "@/components/ui/data-table-features";
import { createColumnHelper } from "@tanstack/react-table";
import type { AdminOrganizations } from "@/types/admin";
import OrganizationsAdminTableDropdown from "@/components/admin/organizations-admin-table-dropdown";

const columnHelper = createColumnHelper<
  DataTableFeatures,
  AdminOrganizations
>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Názov",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("slug", {
    header: "Slug",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("ico", {
    header: "IČO",
    cell: (row) => {
      const ico = row.getValue();
      return ico ?? "-";
    },
  }),
  columnHelper.accessor("_count.members", {
    header: "Počet členov",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Dátum vytvorenia",
    cell: (row) => row.getValue().toLocaleDateString(),
  }),
  columnHelper.display({
    id: "actions",

    cell: ({ row }) => {
      const organization = row.original;

      return <OrganizationsAdminTableDropdown organization={organization} />;
    },
  }),
]);
