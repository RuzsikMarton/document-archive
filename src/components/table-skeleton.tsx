import { Skeleton } from "@/components/ui/skeleton";

export default function FoldersTableSkeleton() {
  return (
    <div className="mt-6 overflow-hidden rounded border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-30" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-6 py-2"
          >
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-30 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />

            <div className="flex items-center gap-2 ml-6">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
