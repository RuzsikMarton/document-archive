"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { DataTableFeatures } from "../../../../components/ui/data-table-features";
import { EmployeeOrganizationResult } from "@/types/organization";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, Copy, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  changeMemberRoleAction,
  removeMemberAction,
} from "@/actions/organization/organization";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const columnHelper = createColumnHelper<
  DataTableFeatures,
  EmployeeOrganizationResult
>();

const roleLabels: Record<string, string> = {
  owner: "Vlastník",
  admin: "Administrátor",
  member: "Člen",
};

const removeMember = async (email: string) => {
  const res = await removeMemberAction(email);
  if (!res.success) {
    toast.error(res.message || "Nepodarilo sa odstrániť člena.");
    return;
  }
  toast.success("Člen bol úspešne odstránený.");
  redirect("/organization/employees");
};

const updateMemberRole = async (memberId: string, newRole: string) => {
  const res = await changeMemberRoleAction(memberId, newRole);
  if (!res.success) {
    toast.error(res.message || "Nepodarilo sa zmeniť rolu člena.");
    return;
  }
  toast.success("Rola člena bola úspešne zmenená.");
  redirect("/organization/employees");
};

export const columns = columnHelper.columns([
  columnHelper.accessor("user.name", {
    header: "Meno",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.user.name}</div>
        <div className="lg:hidden table-cell text-xs text-muted-foreground">
          {row.original.user.email}
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("user.email", {
    header: () => (
      <div className="hidden lg:block font-semibold text-slate-900 dark:text-slate-50">
        Email
      </div>
    ),
    cell: ({ row }) => (
      <div className="hidden lg:block">{row.original.user.email}</div>
    ),
  }),
  columnHelper.accessor("role", {
    header: "Rola",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <div className="text-sm">{roleLabels[role] ?? "Neznáma rola"}</div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",

    cell: ({ row }) => {
      const actions = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" className="h-8 w-8 p-0" />}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-42">
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(actions.user.email)
                }
              >
                Kopírovať email
                <Copy className="text-muted-foreground ml-auto" />
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  disabled={actions.role === "owner"}
                  render={
                    <div
                      className={cn(
                        `px-1.5 py-1 ${actions.role === "owner" ? "opacity-50 cursor-not-allowed" : ""}`,
                      )}
                    >
                      {" "}
                      Zmeniť rolu
                      <ChevronRightIcon className="ml-auto" />
                    </div>
                  }
                />

                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                      value={actions.role}
                      onValueChange={(newRole) =>
                        updateMemberRole(actions.id, newRole)
                      }
                    >
                      <DropdownMenuLabel>Vyberte rolu</DropdownMenuLabel>
                      <DropdownMenuRadioItem value="owner">
                        Vlastník
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="member">
                        Člen
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="admin">
                        Administrátor
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => removeMember(actions.user.email)}
              >
                Odstrániť používateľa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }),
]);
