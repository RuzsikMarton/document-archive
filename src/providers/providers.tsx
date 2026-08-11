"use client";

import { ThemeProvider } from "./theme-provider";
import { NewFolderDialogProvider } from "./new-folder-dialog-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <NewFolderDialogProvider>{children}</NewFolderDialogProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
