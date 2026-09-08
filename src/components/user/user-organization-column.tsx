import { UserPageDataType } from "@/types/user";
import { Building2 } from "lucide-react";
import Link from "next/link";

const UserOrganizationCol = ({ user }: { user: UserPageDataType }) => {
  const members = user.members ?? [];

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="font-semibold text-muted-foreground text-sm uppercase">
        Rola
      </p>
      <div className="flex flex-col justify-center p-2 w-full bg-card/40 dark:bg-accent rounded-lg">
        <p className="font-semibold text-muted-foreground text-sm">Rola</p>
        <p>{user.role === "ADMIN" ? "Administrátor" : "Používateľ"}</p>
      </div>
      <p className="font-semibold text-muted-foreground text-sm uppercase">
        Organizácie
      </p>
      {members.length === 0 ? (
        <div className="flex flex-col items-center text-center justify-center p-4 w-full bg-card/40 dark:bg-accent rounded-lg text-sm text-muted-foreground">
          Používateľ nie je členom žiadnej organizácie.
        </div>
      ) : (
        members.map((member) => (
          <div
            key={member.id}
            className="flex flex-col gap-2 p-4 w-full bg-card/40 dark:bg-accent rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-primary shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <Link
                  href={`/admin/organizations/${member.organization.id}`}
                  className="font-medium hover:underline truncate block"
                >
                  {member.organization.name}
                </Link>
                <p className="text-xs text-muted-foreground truncate">
                  {member.organization.slug}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center p-2 w-full rounded-lg">
              <p className="font-semibold text-muted-foreground text-sm">
                Rola v organizácii
              </p>
              <p className="capitalize">
                {member.role === "owner"
                  ? "Vlastník"
                  : member.role === "admin"
                    ? "Administrátor"
                    : "Používateľ"}
              </p>
            </div>
            <div className="flex flex-col justify-center p-2 w-full rounded-lg">
              <p className="font-semibold text-muted-foreground text-sm">
                Mesto
              </p>
              <p>{member.organization.city ?? "-"}</p>
            </div>
            <div className="flex flex-col justify-center p-2 w-full rounded-lg">
              <p className="font-semibold text-muted-foreground text-sm">
                Email
              </p>
              <p>{member.organization.email ?? "-"}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrganizationCol;
