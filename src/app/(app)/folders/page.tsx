import FoldersTable from "@/components/folders/folders-table";
import { Suspense } from "react";
import FoldersTableSkeleton from "@/components/table-skeleton";
import { requireAuth } from "@/utils/auth";
import NoCompany from "@/components/layout/no-company";
import SiteHeader from "@/components/layout/site-header";
import { GetFolders } from "@/lib/data/get-folders";

const FoldersPage = async (props: {
  searchParams?: Promise<{
    search?: string;
    handedOver?: string;
    years?: string;
    page?: string;
    sortOrder?: "asc" | "desc";
  }>;
}) => {
  const session = await requireAuth("/folders");
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const handedOver = searchParams?.handedOver;
  const years = searchParams?.years || undefined;
  const page = searchParams?.page || "1";
  const sortOrder = searchParams?.sortOrder;

  // Fetch data in server component
  const result = await GetFolders({
    search,
    handedOver,
    years,
    page: Number(page),
    sortOrder,
  });

  return (
    <>
      {session?.session && <SiteHeader title={"Všetky záznamy"} />}
      <div className="flex min-h-screen md:min-h-[calc(100vh-4rem)] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {session?.session.activeOrganizationId ? (
          <div className="flex w-full">
            <div className="sm:px-4 max-w-screen-sm sm:max-w-7xl xl:max-w-350 w-full">
              <Suspense
                key={`${search}-${handedOver}-${years}-${page}-${sortOrder}`}
                fallback={<FoldersTableSkeleton />}
              >
                <FoldersTable
                  data={result.data || []}
                  totalCount={result.totalCount || 0}
                  currentPage={Number(page)}
                  sortOrder={sortOrder || "desc"}
                />
              </Suspense>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <NoCompany />
          </div>
        )}
      </div>
    </>
  );
};

export default FoldersPage;
