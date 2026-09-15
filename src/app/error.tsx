"use client";

import { Button } from "@/components/ui/button";
import { CircleX, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <CircleX className="h-7 w-7 text-destructive" />
        </div>

        <h1 className="text-2xl font-semibold">Niečo sa pokazilo</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Nastala neočakávaná chyba. Skúste stránku načítať znova.
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline" onClick={reset}>
            <RotateCcw />
            Skúsiť znova
          </Button>

          <Button render={<Link href="/">Späť na hlavnú</Link>} />
        </div>
      </div>
    </main>
  );
}
