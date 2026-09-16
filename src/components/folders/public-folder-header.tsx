"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export function PublicFolderHeader({
  isLoggedIn,
  id,
}: {
  isLoggedIn: boolean;
  id: string;
}) {
  const path = `/folders/${id}`;
  return (
    <header className="mx-auto flex w-full items-center justify-between px-4 pb-5 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center space-x-2">
        <Link href="/" aria-label="Evidio - Domov">
          <img
            src="/logo-2.webp"
            alt="Evidio"
            className="block w-28 dark:hidden"
          />

          <img
            src="/logo-dark-2.webp"
            alt="Evidio"
            className="hidden w-28 dark:block"
          />
        </Link>
        <span className="text-sm hidden md:inline font-semibold text-muted-foreground mt-1">
          Záznam:
        </span>
        <span className="text-sm text-muted-foreground mt-1">{id}</span>
      </div>

      {!isLoggedIn && (
        <Button variant="outline" size="sm">
          <Link href={`/signin?redirect=${encodeURIComponent(path)}`}>
            Prihlásiť sa
          </Link>
        </Button>
      )}
    </header>
  );
}
