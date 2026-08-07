import NewCompanyForm from "../forms/new-company-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const CompaniesTable = () => {
  return (
    <div>
      {" "}
      <Dialog>
        <DialogTrigger render={<Button>Add</Button>} />
        <DialogContent>
          <NewCompanyForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompaniesTable;
