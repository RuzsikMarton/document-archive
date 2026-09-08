import TablePagination from "../common/table-pagination";
import SearchInput from "../common/search-input";
import NewCompanyForm from "../forms/new-company-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { DataTable } from "../ui/data-table";
import { columns } from "@/app/(app)/admin/organizations/columns";
import { AdminOrganizations } from "@/types/admin";
import { Plus } from "lucide-react";

const OrganizationsTable = ({
  data,
  totalCount,
  currentPage,
}: {
  data: AdminOrganizations[];
  totalCount: number;
  currentPage: number;
}) => {
  return (
    <div>
      <div className="flex-start gap-4 mb-2">
        <SearchInput />
        <Dialog>
          <DialogTrigger
            render={
              <Button className="flex items-center gap-2 w-1/3 md:w-1/8">
                Nová <Plus />
              </Button>
            }
          />
          <DialogContent>
            <NewCompanyForm />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data} />
      <TablePagination
        page={currentPage}
        totalCount={totalCount}
        pageSize={25}
      />
    </div>
  );
};

export default OrganizationsTable;
