"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { AlertCircle, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const WrongAccountCard = ({
  email,
  invitationId,
}: {
  email: string;
  invitationId: string;
}) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push(`/signin?inviteId=${invitationId}&email=${email}`);
    router.refresh();
  };
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center w-full rounded-md bg-card p-6 sm:p-8 max-w-md md:min-w-md border shadow-sm">
        <img
          src={"/logo-dark-2.webp"}
          alt="Evidio Logo"
          className="w-44 h-auto hidden dark:block mb-6"
          loading="lazy"
          decoding="async"
        />
        <img
          src={"/logo-2.webp"}
          alt="Evidio Logo"
          className="w-44 h-auto block dark:hidden mb-6"
          loading="lazy"
          decoding="async"
        />

        <div className="flex flex-col items-center gap-4 w-full text-center">
          <div className="rounded-full bg-amber-500/10 p-3">
            <AlertCircle className="h-8 w-8 text-amber-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Nesprávny účet</h1>
            <p className="text-muted-foreground">
              Táto pozvánka bola odoslaná na:
            </p>
          </div>

          <div className="w-full rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{email}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Prihláste sa pomocou tohto e-mailu.
          </p>

          <Button
            variant="destructive"
            className="w-full mt-4"
            onClick={handleSignOut}
          >
            Odhlásiť sa a prihlásiť iným účtom
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WrongAccountCard;
