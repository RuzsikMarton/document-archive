"use client";

import { SessionUserType } from "@/types/auth";
import { Building2, Briefcase, Crown, Users } from "lucide-react";

const AccountCompany = ({ user }: { user: SessionUserType }) => {
  const hasCompany = user.companyId && user.companyName;

  return (
    <section className="rounded-lg border bg-slate-100 dark:bg-card p-6 space-y-4">
      <h2 className="text-xl font-semibold">Spoločnosť</h2>

      {hasCompany ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Názov spoločnosti</span>
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {user.companyName}
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Rola v spoločnosti</span>
            </div>
            <div className="flex items-center gap-2">
              {user.companyRole === "OWNER" ? (
                <>
                  <Crown className="size-4 text-amber-500" />
                  <span className="text-sm text-muted-foreground font-medium">
                    Majiteľ
                  </span>
                </>
              ) : (
                <>
                  <Users className="size-4 text-primary" />
                  <span className="text-sm text-muted-foreground font-medium">
                    Zamestnanec
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
          <div className="relative">
            <div className="absolute inset-0 bg-muted/30 blur-xl rounded-full" />
            <div className="relative flex items-center justify-center size-16 rounded-full bg-muted border border-border">
              <Building2 className="size-8 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Zatiaľ nie ste členom žiadnej spoločnosti
            </p>
            <p className="text-xs text-muted-foreground/70">
              Kontaktujte svojho administrátora pre pridanie do spoločnosti
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default AccountCompany;
