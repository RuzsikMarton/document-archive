"use client";

import { Invitation } from "@/generated/prisma/client";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableFooter,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  inviteMemberAction,
  cancelInvitationAction,
} from "@/actions/organization/organization";

const PendingInvitationsTable = ({
  invitations,
}: {
  invitations: Invitation[] | undefined;
}) => {
  const router = useRouter();

  const resendInvitation = async (email: string, organizationId: string) => {
    const res = await inviteMemberAction(email, organizationId);

    if (!res.success) {
      toast.error(res.message || "Nepodarilo sa odoslať pozvánku.");
      return;
    }
    toast.success("Pozvánka bola úspešne odoslaná.");
    router.refresh();
  };

  const cancelInvitation = async (id: string) => {
    const res = await cancelInvitationAction(id);
    if (!res.success) {
      toast.error(res.message || "Nepodarilo sa odoslať pozvánku.");
      return;
    }
    toast.success("Pozvánka bola úspešne odoslaná.");
    router.refresh();
  };

  if (!invitations || invitations.length === 0) {
    return (
      <div className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100">
          Čakajúce pozvánky
        </h2>
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-12 text-center">
          <div className="mx-auto flex flex-col items-center justify-center space-y-3">
            <div className="rounded-full bg-slate-100 dark:bg-slate-700 p-3">
              <svg
                className="h-6 w-6 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Žiadne čakajúce pozvánky
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Momentálne nemáte žiadne nevybavené pozvánky do organizácie
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100">
        Čakajúce pozvánky
      </h2>
      <div className="overflow-hidden rounded border w-full bg-white dark:bg-slate-800">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
            <TableRow>
              <TableCell className="px-4 sm:px-6 py-3 font-semibold">
                Email
              </TableCell>
              <TableCell className="px-4 sm:px-6 py-3 font-semibold">
                Vytvorené
              </TableCell>
              <TableCell className="px-4 sm:px-6 py-3 font-semibold">
                Expiruje
              </TableCell>
              <TableCell className="px-4 sm:px-6 py-3">Stav</TableCell>
              <TableCell className="px-4 sm:px-6 py-3"></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitations.map((invitation) => (
              <TableRow key={invitation.id}>
                <TableCell className="px-4 sm:px-6 py-2">
                  {invitation.email}
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-2">
                  {invitation.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-2">
                  {invitation.expiresAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-2">
                  {invitation.status === "pending" ? (
                    <span className="text-yellow-600 font-semibold">
                      Čakajúca
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Expirovaná
                    </span>
                  )}
                </TableCell>
                <TableCell className="px-4 sm:px-6 py-2 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost">
                          <Ellipsis />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuItem
                        onClick={() =>
                          resendInvitation(
                            invitation.email,
                            invitation.organizationId,
                          )
                        }
                      >
                        Poslať znovu
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => cancelInvitation(invitation.id)}
                      >
                        Zrušiť pozvánku
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-slate-50 dark:bg-slate-900/50">
            <TableRow>
              <TableCell
                className="px-4 sm:px-6 py-2 font-semibold"
                colSpan={4}
              >
                Spolu
              </TableCell>
              <TableCell className="text-right px-4 sm:px-6 py-2" colSpan={1}>
                {invitations.length} pozvánok
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default PendingInvitationsTable;
