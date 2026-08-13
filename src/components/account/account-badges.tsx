"use client";

import { SessionUserType } from "@/types/auth";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { BadgeCheck, Crown, Shield, Users, Award } from "lucide-react";

const AccountBadges = ({ user }: { user: SessionUserType }) => {
  const hasBadges =
    user.emailVerified ||
    user.role === "ADMIN" ||
    user.companyRole === "OWNER" ||
    user.companyId;

  return (
    <section className="rounded-lg border bg-slate-100 dark:bg-card p-6 space-y-4">
      <h1 className="text-lg font-medium leading-none">Odznaky</h1>
      <div className="flex flex-wrap gap-6 items-center justify-center sm:justify-start mt-4">
        {!hasBadges ? (
          <div className="flex flex-col items-center justify-center py-4 w-full text-center space-y-3">
            <div className="relative">
              <div className="absolute inset-0 bg-muted/30 blur-xl rounded-full" />
              <div className="relative flex items-center justify-center size-14 rounded-full bg-muted border border-border">
                <Award className="size-7 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Zatiaľ nemáte žiadne odznaky
              </p>
              <p className="text-xs text-muted-foreground/70">
                Odznaky získate overením emailu alebo vstupom do spoločnosti
              </p>
            </div>
          </div>
        ) : (
          <>
            {user.emailVerified && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <div
                      className={
                        "border-2 border-emerald-500 bg-emerald-300/15 rounded-full p-2"
                      }
                    >
                      <BadgeCheck className="w-8 h-8 text-emerald-500 " />
                    </div>
                  }
                />
                <TooltipContent>Overený email</TooltipContent>
              </Tooltip>
            )}
            {user.role === "ADMIN" && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <div
                      className={
                        "border-2 border-mauve-600 dark:border-mauve-400 bg-mauve-600/15 rounded-full p-2"
                      }
                    >
                      <Shield className="w-8 h-8 text-mauve-600 dark:text-mauve-400" />
                    </div>
                  }
                />
                <TooltipContent>Administrátor</TooltipContent>
              </Tooltip>
            )}
            {user.companyRole === "OWNER" && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <div
                      className={
                        "border-2 border-amber-500 bg-amber-300/15 rounded-full p-2"
                      }
                    >
                      <Crown className="w-8 h-8 text-amber-500 " />
                    </div>
                  }
                />
                <TooltipContent>Majiteľ spoločnosti</TooltipContent>
              </Tooltip>
            )}
            {user.companyId && (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <div
                      className={
                        "border-2 border-primary bg-primary/15 rounded-full p-2"
                      }
                    >
                      <Users className="w-8 h-8 text-primary " />
                    </div>
                  }
                />
                <TooltipContent>Ste členom spoločnosti</TooltipContent>
              </Tooltip>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AccountBadges;
