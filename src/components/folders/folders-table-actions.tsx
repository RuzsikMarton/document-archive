"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  Eye,
  XCircle,
  CheckCircle2,
  Trash2,
  Trash2Icon,
  Loader2,
  EllipsisVertical,
} from "lucide-react";
import { Folder } from "@/generated/prisma/browser";
import {
  deleteFolderAction,
  folderHandedOverAction,
} from "@/actions/folder/folder";
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
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const FolderTableActions = ({
  folder,
  isHandedOver,
}: {
  folder: Folder;
  isHandedOver: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);
    const res = await deleteFolderAction(folder.id);
    if (!res.success) {
      toast.error(res.message || "Chyba pri mazaní záznamu.");
      setIsPending(false);
      return;
    }
    toast.success("Záznam bol úspešne zmazaný.");
    setOpen(false);
    setIsPending(false);
  };

  const handleHandedOverChange = async (checked: boolean) => {
    const res = await folderHandedOverAction(folder.id, checked);
    if (!res.success) {
      toast.error(res.message || "Chyba pri aktualizácii stavu odovzdania.");
      return;
    }
    if (checked) {
      toast.success("Záznam bol úspešne označený ako odovzdaný.");
    } else {
      toast.success("Záznam bol úspešne označený ako neodovzdaný.");
    }
  };

  return (
    <div className="flex items-center justify-end">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>Zmazať záznam?</AlertDialogTitle>
            <AlertDialogDescription>
              Ste si istý, že chcete zmazať tento záznam? Táto akcia je nevratná
              a všetky údaje budú nenávratne odstránené.
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
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-card/50 hover:text-accent-foreground cursor-pointer"
            >
              <EllipsisVertical className="text-foreground/60" />
            </button>
          }
        />
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                href={`/folders/${folder.id}`}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50"
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <Eye className="h-4 w-4" /> Zobraziť
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={isPending}
              onClick={() => {
                handleHandedOverChange(!isHandedOver);
              }}
            >
              {isHandedOver ? (
                <XCircle className="text-amber-700 dark:text-amber-300" />
              ) : (
                <CheckCircle2 className="text-green-800 dark:text-green-300" />
              )}
              <span className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50">
                {isHandedOver ? "Zrušiť odovzdanie" : "Odovzdať"}
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={(event) => {
                event.preventDefault();
                setOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
              Odstrániť
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FolderTableActions;
