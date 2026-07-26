"use client";

import { PublicSession } from "@/types/auth";
import { ThemeProvider } from "./theme-provider";
import ConditionalLayout from "./conditional-layout";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: PublicSession | null;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConditionalLayout session={session}>{children}</ConditionalLayout>
    </ThemeProvider>
  );
}
