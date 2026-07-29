"use client";

import { Folder as PrismaFolder } from "@/generated/prisma/client";
import { useNewFolderDialog } from "@/providers/new-folder-dialog-provider";
import { Plus, FolderOpen, Clock, ChevronRight, Info } from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboard = ({ folders }: { folders: PrismaFolder[] }) => {
  const { openDialog } = useNewFolderDialog();
  const router = useRouter();
  return (
    <div className="flex w-full 2xl:w-3/4">
      <div className="sm:px-6 max-w-screen-sm sm:max-w-7xl xl:max-w-350 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 pb-4 sm:pb-6 border-b gap-3 sm:gap-0">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Archív dokumentov
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Centralizovaný systém správy šanónov
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
              {new Date().toLocaleDateString("sk-SK", {
                weekday: "long",
                day: "numeric",
                month: "short",
              })}
            </p>
            <p className="text-base sm:text-xl font-semibold text-slate-900 dark:text-slate-50 mt-0.5">
              {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-10">
          <button
            type="button"
            onClick={openDialog}
            className="flex items-center gap-3 sm:gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 sm:p-5 text-left transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
              <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-50">
                Pridať
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Vytvoriť nový záznam
              </p>
            </div>
          </button>

          <a
            href="/folders"
            className="flex items-center gap-3 sm:gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 sm:p-5 transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-slate-100 dark:group-hover:bg-slate-600 transition-colors">
              <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-50">
                Všetky
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Kompletný zoznam
              </p>
            </div>
          </a>

          <a
            href="/folders?status=pending"
            className="flex items-center gap-3 sm:gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 sm:p-5 transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-900 transition-colors">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-50">
                Čakajúce
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Neodovzdané šanóny
              </p>
            </div>
          </a>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700  overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
              Nedávna aktivita
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Posledných 5 vytvorených záznamov
            </p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {folders.length === 0 ? (
              <div className="flex flex-col items-center text-center justify-center px-4 sm:px-6 py-3 sm:py-4 text-sm text-slate-600 dark:text-slate-400">
                <Info className="w-5 h-5 my-2 text-slate-400 dark:text-slate-500" />
                Žiadne záznamy na zobrazenie, vytvorte nový záznam kliknutím na
                tlačidlo "Pridať" v hornej časti.
              </div>
            ) : (
              folders.map((folder) => (
                <div
                  onClick={() => router.push(`/folders/${folder.id}`)}
                  key={folder.id}
                  className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-3 sm:gap-6">
                    <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {folder.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 truncate">
                          {folder.contents}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-500">
                          <span>Rok {folder.year}</span>
                          <span>•</span>
                          <span>
                            {folder.createdAt.toLocaleDateString("sk-SK", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                          folder.handedOver
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
                            : "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
                        }`}
                      >
                        {folder.handedOver ? "Odovzdané" : "Čakajúce"}
                      </span>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
