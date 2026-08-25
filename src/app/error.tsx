"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2>Niečo sa pokazilo.</h2>

      <button onClick={() => reset()}>Skúsiť znova</button>
      <Link href="/">
        <button>Späť na hlavnú</button>
      </Link>
    </div>
  );
}
