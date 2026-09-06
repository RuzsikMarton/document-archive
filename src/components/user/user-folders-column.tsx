"use client";

import { UserPageDataType } from "@/types/user";
import { Clock, FolderOpen, Info } from "lucide-react";
import Link from "next/link";

const UserFoldersCol = ({ user }: { user: UserPageDataType }) => {
  const folders = (user.members ?? []).flatMap(
    (member: any) => member.folders ?? [],
  );
  const lastSession = user.sessions?.[0];

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="font-semibold text-muted-foreground text-sm uppercase">
        Aktivita
      </p>
      <div className="flex items-center gap-3 p-2 w-full bg-card/40 dark:bg-accent rounded-lg">
        <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-700 border flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-muted-foreground text-sm">
            Posledné prihlásenie
          </p>
          <p>
            {lastSession
              ? new Date(lastSession.createdAt).toLocaleDateString("sk-SK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Nikdy"}
          </p>
        </div>
      </div>
      <p className="font-semibold text-muted-foreground text-sm uppercase">
        Nedávne záznamy
      </p>
      {folders.length === 0 ? (
        <div className="flex flex-col items-center text-center justify-center p-4 w-full bg-card/40 dark:bg-accent rounded-lg text-sm text-muted-foreground">
          <Info className="w-5 h-5 mb-2 text-muted-foreground" />
          Používateľ zatiaľ nevytvoril žiadny záznam.
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full bg-card/40 dark:bg-accent rounded-lg p-2">
          {folders.map((folder: any) => (
            <Link
              key={folder.id}
              href={`/folders/${folder.id}`}
              className="flex items-center gap-3 p-2 w-full rounded-lg hover:bg-card/70 dark:hover:bg-card/70 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg border bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                <FolderOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{folder.name}</p>
                <p className="text-xs text-muted-foreground">
                  Rok {folder.year} ·{" "}
                  {new Date(folder.createdAt).toLocaleDateString("sk-SK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap shrink-0 ${
                  folder.handedOver
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
                    : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
                }`}
              >
                {folder.handedOver ? "Odovzdané" : "Čakajúce"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFoldersCol;
