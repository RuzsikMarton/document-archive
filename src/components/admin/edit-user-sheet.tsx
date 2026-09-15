"use client";

import { AdminUsers } from "@/types/admin";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { changeUserDataAdmin } from "@/actions/admin/users";
import { toast } from "sonner";

const EditUserSheet = ({
  open,
  setOpen,
  user,
}: {
  user: AdminUsers;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSaveChanges = async () => {
    setSubmitting(true);
    const res = await changeUserDataAdmin({
      id: user.id,
      name: (document.getElementById("user-name") as HTMLInputElement).value,
      email: (document.getElementById("user-email") as HTMLInputElement).value,
      telephone: (document.getElementById("user-telephone") as HTMLInputElement)
        .value,
    });

    if (!res.success) {
      toast.error(
        res.message || "Nepodarilo sa aktualizovať údaje používateľa.",
      );
    } else {
      setOpen(false);
      toast.success("Údaje používateľa boli úspešne aktualizované.");
    }
    setSubmitting(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upraviť používateľa</SheetTitle>
          <SheetDescription>
            Aktualizujte informácie o používateľovi nižšie.
          </SheetDescription>
        </SheetHeader>
        <div className="grid auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="user-name">Name</Label>
            <Input id="user-name" defaultValue={user.name} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-email">Email</Label>
            <Input id="user-email" defaultValue={user.email} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-telephone">Telephone</Label>
            <Input
              placeholder="pr.: +421912345678"
              id="user-telephone"
              defaultValue={user.telephone || ""}
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={handleSaveChanges}>
            {submitting ? <Loader2 className="animate-spin" /> : "Save changes"}
          </Button>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditUserSheet;
