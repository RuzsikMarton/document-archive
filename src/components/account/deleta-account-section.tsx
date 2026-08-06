"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
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
import { deleteOwnAccountAction } from "@/actions/user/profile";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DeleteAccountSection = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    setIsPending(true);
    const res = await deleteOwnAccountAction();
    if (!res.success) {
      toast.error(res.message || "Nepodarilo sa vymazať účet.");
    } else {
      router.push("/");
    }
    setIsPending(false);
  };
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
          <AlertTriangle className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Nebezpečná zóna</h2>
          <p className="text-sm text-muted-foreground">Nevratné akcie účtu</p>
        </div>
      </div>
      <div className="rounded-lg border border-destructive/50 bg-slate-100 dark:bg-card p-6 space-y-4">
        <div>
          <h3 className="font-medium text-destructive">Vymazať účet</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ak svoj účet vymažete, nebude možné ho obnoviť. Všetky vaše údaje a
            záznamy budú trvalo odstránené. Vrátenie účtu nie je možné.
          </p>
        </div>
        <div className="flex justify-end">
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant="destructive" size="sm">
                  Vymazať účet
                </Button>
              }
            />
            <AlertDialogContent size="sm" className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <AlertTriangle />
                </AlertDialogMedia>
                <AlertDialogTitle>Vymazať účet?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ste si istí, že chcete vymazať svoj účet? Táto akcia je
                  nevratná. Pred vymazaním účtu sa uistite, že ste si zálohovali
                  všetky dôležité údaje.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">Zrušiť</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isPending}
                >
                  {isPending ? <Loader2 className="animate-spin" /> : "Vymazať"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};

export default DeleteAccountSection;
