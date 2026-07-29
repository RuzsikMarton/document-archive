"use client";

import { ThemeProvider } from "./theme-provider";
import ConditionalLayout from "./conditional-layout";
import { PublicSession } from "@/types/auth";
import { NewFolderDialogProvider } from "./new-folder-dialog-provider";

export function Providers({
  children,
  publicSession,
}: {
  children: React.ReactNode;
  publicSession: PublicSession | null;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ConditionalLayout publicSession={publicSession}>
        <NewFolderDialogProvider>{children}</NewFolderDialogProvider>
      </ConditionalLayout>
    </ThemeProvider>
  );
}
