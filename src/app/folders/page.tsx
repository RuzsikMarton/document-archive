import TableFilters from "@/components/folders/table-filters";
import FoldersTable from "@/components/folders/folders-table";
import { Suspense } from "react";
import FoldersTableSkeleton from "@/components/TableSkeleton";
import { getSession, requireAuth } from "@/utils/auth";
import NoCompany from "@/components/layout/no-company";

const FoldersPage = async (props: {
  searchParams?: Promise<{
    search?: string;
    handedOver?: string;
    years?: string;
    currentPage?: string;
    sortOrder?: "asc" | "desc";
  }>;
}) => {
  await requireAuth("/folders");
  const session = await getSession();

  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const handedOver = searchParams?.handedOver;
  const years = searchParams?.years || undefined;
  const currentPage = searchParams?.currentPage || "1";
  const sortOrder = searchParams?.sortOrder;

  return (
    <main className="flex min-h-screen md:min-h-[calc(100vh-4rem)] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {session?.user.companyId ? (
        <div className="flex w-full 2xl:w-3/4">
          <div className="sm:px-6 max-w-screen-sm sm:max-w-7xl xl:max-w-350 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-700 gap-3 sm:gap-0">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  Všetky záznamy
                </h1>
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

            <TableFilters />
            <Suspense
              key={`${search}-${handedOver}-${years}-${currentPage}-${sortOrder}`}
              fallback={<FoldersTableSkeleton />}
            >
              <FoldersTable
                search={search}
                handedOver={handedOver}
                years={years}
                currentPage={currentPage}
                sortOrder={sortOrder}
              />
            </Suspense>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <NoCompany />
        </div>
      )}
    </main>
  );
};

export default FoldersPage;
