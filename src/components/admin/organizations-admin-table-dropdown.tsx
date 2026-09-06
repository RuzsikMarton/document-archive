"use client";
import type { AdminOrganizations } from "@/types/admin";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Copy, EllipsisVertical, Loader2, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { deleteOrganizationAdmin } from "@/actions/admin/organizations";
import EditOrganizationSheet from "./edit-organization-sheet";

const OrganizationsAdminTableDropdown = ({
  organization,
}: {
  organization: AdminOrganizations;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    const res = await deleteOrganizationAdmin(organization.id);
    if (!res.success) {
      toast.error(res.message || "Nepodarilo sa zmazať organizáciu");
      setIsPending(false);
      return;
    }
    toast.success(res.message || "Organizácia bola úspešne zmazaná");
    setOpenDialog(false);
    setIsPending(false);
  };
  return (
    <div className="flex justify-end">
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Zmazať organizáciu?</AlertDialogTitle>
            <AlertDialogDescription>
              Ste si istý, že chcete zmazať túto organizáciu? Táto akcia je
              nevratná a všetky údaje budú nenávratne odstránené.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Zrušiť</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              render={
                <Button onClick={handleDelete} disabled={isPending}>
                  {isPending ? <Loader2 className="animate-spin" /> : "Zmazať"}
                </Button>
              }
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost">
              <EllipsisVertical />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="min-w-42">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(organization.id)}
            >
              Kopírovať ID
              <Copy className="text-muted-foreground ml-auto" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Správa organizácie</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/admin/organizations/${organization.id}`}>
                Zobraziť organizáciu
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenSheet(true)}>
              Upraviť organizáciu
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog(!openDialog)}
          >
            Odstrániť organizáciu
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditOrganizationSheet
        organization={organization}
        open={openSheet}
        setOpen={setOpenSheet}
      />
    </div>
  );
};

export default OrganizationsAdminTableDropdown;
