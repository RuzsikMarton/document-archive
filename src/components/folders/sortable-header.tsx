"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SortableHeaderProps {
  title: string;
  sortKey: string;
}

export default function SortableHeader({
  title,
  sortKey,
}: SortableHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSortOrder = searchParams.get("sortOrder") ?? "desc";

  const nextOrder = currentSortOrder === "asc" ? "desc" : "asc";
  const hasSort = searchParams.has("sortOrder");

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("sortOrder", nextOrder);
    params.set("currentPage", "1");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className="-ml-4 font-semibold"
    >
      {title}

      {!hasSort ? (
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      ) : currentSortOrder === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
