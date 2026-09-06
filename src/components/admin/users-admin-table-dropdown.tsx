"use client";
import {
  changeUserRoleAdmin,
  deleteUserAdmin,
  resetPasswordAdmin,
} from "@/actions/admin/users";
import { AdminUsers } from "@/types/admin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ChevronRightIcon,
  Copy,
  EllipsisVertical,
  Loader2,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
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
import EditUserSheet from "./edit-user-sheet";

const UsersAdminTableDropdown = ({ user }: { user: AdminUsers }) => {
  const [openSheet, setOpenSheet] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleRoleChange = async (newRole: "USER" | "ADMIN") => {
    setIsPending(true);
    if (newRole !== user.role) {
      const res = await changeUserRoleAdmin(user.id, newRole);
      if (!res.success) {
        toast.error(res.message || "Nepodarilo sa zmeniť rolu používateľa");
      } else {
        toast.success(res.message || "Rola používateľa bola úspešne zmenená");
      }
    } else {
      toast.warning("Nová rola je rovnaká ako aktuálna rola používateľa");
    }
    setIsPending(false);
  };

  const handleResetPassword = async () => {
    setIsPending(true);
    const res = await resetPasswordAdmin(user.email);
    if (!res.success) {
      toast.error(res.message || "Nepodarilo sa resetovať heslo používateľa");
    } else {
      toast.success(
        res.message || "Odkaz na resetovanie hesla bol odoslaný na email",
      );
    }
    setIsPending(false);
  };

  const handleDelete = async () => {
    setIsPending(true);
    const res = await deleteUserAdmin(user.id);
    if (!res.success) {
      toast.error(res.message || "Nepodarilo sa zmazať používateľa");
      setIsPending(false);
      return;
    }
    toast.success(res.message || "Používateľ bol úspešne zmazaný");
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
            <AlertDialogTitle>Zmazať používateľa?</AlertDialogTitle>
            <AlertDialogDescription>
              Ste si istý, že chcete zmazať tohto používateľa? Táto akcia je
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
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Kopírovať ID
              <Copy className="text-muted-foreground ml-auto" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Správa používateľa</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/users/${user.id}`}>Zobraziť používateľa</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Akcie používateľa</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpenSheet(true)}>
              Upraviť používateľa
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                render={
                  <div className={`px-1.5 py-1 `}>
                    Zmeniť rolu
                    <ChevronRightIcon className="ml-auto" />
                  </div>
                }
              />

              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={user.role}>
                    <DropdownMenuLabel>Vyberte rolu</DropdownMenuLabel>
                    <DropdownMenuRadioItem
                      value="USER"
                      onClick={() => handleRoleChange("USER")}
                    >
                      Používateľ
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="ADMIN"
                      onClick={() => handleRoleChange("ADMIN")}
                    >
                      Administrátor
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={() => handleResetPassword()}>
              Resetovať heslo
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDialog(!openDialog)}
          >
            Odstrániť používateľa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUserSheet open={openSheet} setOpen={setOpenSheet} user={user} />
    </div>
  );
};

export default UsersAdminTableDropdown;
