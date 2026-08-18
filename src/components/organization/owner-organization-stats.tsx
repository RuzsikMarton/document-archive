"use client";

import { Organization } from "@/generated/prisma/client";
import { OrganizationStatsResult } from "@/types/organization";
import { Separator } from "../ui/separator";

const OwnerOrganizationStats = ({
  organization,
  stats,
}: {
  organization: Organization;
  stats: OrganizationStatsResult;
}) => {
  return (
    <div className="w-full lg:w-1/3 flex-1 rounded-lg border bg-slate-100 p-6 space-y-6 dark:bg-slate-800  dark:border-slate-700">
      <h1 className="text-lg font-semibold">Štatistiky organizácie</h1>
      <p className="font-semibold text-primary/90">
        Vytvorená: {organization.createdAt.toLocaleDateString()}
      </p>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">Zamestnanci</p>
        <Separator className="my-1" />
        <div className="flex justify-between items-center gap-0.5">
          <span className="text-muted-foreground text-sm">
            Celkový počet zamestnancov:{" "}
          </span>
          <span className="font-semibold">{stats?.employees || "-"}</span>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground">Dokumenty</p>
        <Separator className="my-1" />
        <div className="flex justify-between items-center gap-0.5">
          <span className="text-muted-foreground text-sm">
            Celkový počet záznamov:{" "}
          </span>
          <span className="font-semibold">{stats?.folders || "-"}</span>
        </div>
        <div className="flex justify-between items-center gap-0.5">
          <span className="text-muted-foreground text-sm">
            Záznamy tento rok:{" "}
          </span>
          <span className="font-semibold">{stats?.foldersThisYear || "-"}</span>
        </div>
        <div className="flex justify-between items-center gap-0.5">
          <span className="text-muted-foreground text-sm">
            Odovzdané dokumenty:{" "}
          </span>
          <span className="font-semibold">
            {stats?.handedOverFolders || "-"}
          </span>
        </div>
        <div className="flex justify-between items-center gap-0.5">
          <span className="text-muted-foreground text-sm">
            Neodovzdané dokumenty:{" "}
          </span>
          <span className="font-semibold">{stats?.notHanded || "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default OwnerOrganizationStats;
