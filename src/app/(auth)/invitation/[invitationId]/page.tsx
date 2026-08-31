import AcceptInvitationButton from "@/components/organization/accept-invitation-button";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/auth";
import { XCircle, Mail, UserPlus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WrongAccountCard from "@/components/organization/invitation/wrong-account-card";

const InvitationPage = async ({
  params,
}: {
  params: Promise<{ invitationId: string }>;
}) => {
  const { invitationId } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: {
      id: invitationId,
    },
    include: {
      organization: true,
    },
  });

  if (
    !invitation ||
    invitation.status !== "pending" ||
    invitation.expiresAt < new Date()
  ) {
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
            <div className="rounded-full bg-destructive/10 p-3">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Pozvánka nie je platná</h1>
              <p className="text-muted-foreground">
                Pozvánka už bola použitá alebo jej platnosť vypršala.
              </p>
            </div>

            <Link href="/" className="w-full mt-4">
              <Button variant="outline" className="w-full">
                Späť na hlavnú stránku
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const session = await getSession();

  if (!session) {
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
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Pozvánka do organizácie</h1>
              <p className="text-muted-foreground">
                Boli ste pozvaný do organizácie{" "}
                <span className="font-semibold text-foreground">
                  {invitation.organization.name}
                </span>
              </p>
            </div>

            <div className="w-full rounded-lg bg-muted/50 p-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{invitation.email}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full mt-4">
              <Link
                href={`/signup?inviteId=${invitationId}&email=${invitation?.email}`}
                className="w-full"
              >
                <Button className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Vytvoriť účet
                </Button>
              </Link>

              <Link
                href={`/signin?inviteId=${invitationId}&email=${invitation?.email}`}
                className="w-full"
              >
                <Button variant="outline" className="w-full">
                  Už mám účet – Prihlásiť sa
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (session.user.email !== invitation.email) {
    return (
      <WrongAccountCard email={invitation.email} invitationId={invitationId} />
    );
  }

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
          <div className="rounded-full bg-primary/10 p-3">
            <Building2 className="h-8 w-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Pozvánka do organizácie</h1>
            <p className="text-muted-foreground">
              Boli ste pozvaný do organizácie{" "}
              <span className="font-semibold text-foreground">
                {invitation.organization.name}
              </span>
            </p>
          </div>

          <div className="w-full rounded-lg bg-muted/50 p-4 space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{invitation.email}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-muted-foreground">Rola:</span>
              <span className="font-medium">Člen</span>
            </div>
          </div>

          <div className="w-full mt-4">
            <AcceptInvitationButton invitationId={invitationId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationPage;
