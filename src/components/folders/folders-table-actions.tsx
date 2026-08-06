"use client";

import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import {
  Eye,
  XCircle,
  CheckCircle2,
  Trash2,
  Trash2Icon,
  Loader2,
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
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

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
    <div className="flex items-center justify-end gap-2">
      <Tooltip>
        <TooltipTrigger
          render={
            <Link
              href={`/folders/${folder.id}`}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50"
            >
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-slate-200 dark:border-slate-700"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          }
        />
        <TooltipContent>
          <p>Zobraziť</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              disabled={isPending}
              className={`h-8 border-slate-200 dark:border-slate-700 ${
                isHandedOver
                  ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950"
                  : "text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
              }`}
              onClick={() => {
                handleHandedOverChange(!isHandedOver);
              }}
            >
              {isHandedOver ? (
                <XCircle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
            </Button>
          }
        />
        <TooltipContent>
          <p>{isHandedOver ? "Zrušiť odovzdanie" : "Odovzdať"}</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger
            render={
              <div>
                <AlertDialogTrigger
                  render={
                    <Button
                      disabled={isPending}
                      variant="outline"
                      size="sm"
                      className="h-8 border-slate-200 dark:border-slate-700 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  }
                />
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                      <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Zmazať záznam?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Ste si istý, že chcete zmazať tento záznam? Táto akcia je
                      nevratná a všetky údaje budú nenávratne odstránené.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">
                      Zrušiť
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      render={
                        <Button onClick={handleDelete} disabled={isPending}>
                          {isPending ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            "Zmazať"
                          )}
                        </Button>
                      }
                    />
                  </AlertDialogFooter>
                </AlertDialogContent>
              </div>
            }
          />
          <TooltipContent>
            <p>Odstrániť</p>
          </TooltipContent>
        </Tooltip>
      </AlertDialog>
    </div>
  );
};

export default FolderTableActions;
