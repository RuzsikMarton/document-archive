"use client";

import NewFolderForm from "@/components/forms/NewFolderForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { createContext, useContext, useMemo, useState } from "react";

type NewFolderDialogContextType = {
  openDialog: () => void;
  closeDialog: () => void;
};

const NewFolderDialogContext = createContext<NewFolderDialogContextType | null>(
  null,
);

export function NewFolderDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      openDialog: () => setOpen(true),
      closeDialog: () => setOpen(false),
    }),
    [],
  );

  return (
    <NewFolderDialogContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <NewFolderForm />
        </DialogContent>
      </Dialog>
    </NewFolderDialogContext.Provider>
  );
}

export function useNewFolderDialog() {
  const context = useContext(NewFolderDialogContext);

  if (!context) {
    throw new Error(
      "useNewFolderDialog must be used within NewFolderDialogProvider",
    );
  }
  return context;
}
