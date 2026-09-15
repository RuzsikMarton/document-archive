"use client";

import { FolderOpen, CheckCircle, Clock } from "lucide-react";

interface DashboardCardsProps {
  stats: {
    total: number;
    handedOver: number;
    notHandedOver: number;
  };
}

const DashboardCards = ({ stats }: DashboardCardsProps) => {
  return (
    <div className="hidden md:grid md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-10">
      {/* Total Folders Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
              Celkom šanónov
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mt-1">
              {stats.total}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Handed Over Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
              Odovzdané (tento rok)
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mt-1">
              {stats.handedOver}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-50 dark:bg-green-950 flex items-center justify-center text-green-600 dark:text-green-400">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>

      {/* Not Handed Over Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
              Neodovzdané
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mt-1">
              {stats.notHandedOver}
            </p>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
