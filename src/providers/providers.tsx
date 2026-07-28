"use client";

import { ThemeProvider } from "./theme-provider";
import ConditionalLayout from "./conditional-layout";

export function Providers({
  children,
  publicSession,
}: {
  children: React.ReactNode;
  publicSession: any;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConditionalLayout publicSession={publicSession}>
        {children}
      </ConditionalLayout>
    </ThemeProvider>
  );
}
