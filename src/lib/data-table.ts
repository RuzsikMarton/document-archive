import type { Column } from "@tanstack/react-table";
import type React from "react";
import type { DataTableFeatures } from "@/app/(app)/folders/data-table-features";
import type { Folder } from "@/generated/prisma/client";

export function getColumnPinningStyle({
  column,
  withBorder = false,
}: {
  column: Column<DataTableFeatures, Folder, unknown>;
  withBorder?: boolean;
}): React.CSSProperties {
  const isPinned = column.getIsPinned();

  const isLastLeftPinnedColumn =
    isPinned === "start" && column.getIsLastColumn("start");

  const isFirstRightPinnedColumn =
    isPinned === "end" && column.getIsFirstColumn("end");

  return {
    boxShadow: withBorder
      ? isLastLeftPinnedColumn
        ? "-4px 0 4px -4px var(--border) inset"
        : isFirstRightPinnedColumn
          ? "4px 0 4px -4px var(--border) inset"
          : undefined
      : undefined,

    left: isPinned === "start" ? `${column.getStart("start")}px` : undefined,

    right: isPinned === "end" ? `${column.getAfter("end")}px` : undefined,

    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? "sticky" : undefined,
    background: isPinned ? "inherit" : undefined,
    zIndex: isPinned ? 1 : undefined,
  };
}
