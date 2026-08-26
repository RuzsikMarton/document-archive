"use client";

import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4 w-full text-center max-w-3xl bg-card rounded-2xl p-4">
        <CircleX className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-bold text-destructive">
          Niečo sa pokazilo.
        </h2>
        <span className="text-muted-foreground text-sm">
          Neočakávaná chyba. Skúste to prosím znova.
        </span>
        <div className="flex gap-2">
          <Button variant={"outline"} onClick={() => reset()}>
            Skúsiť znova
          </Button>
          <Link href="/">
            <Button>Späť na hlavnú</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
