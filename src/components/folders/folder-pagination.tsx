"use client";

import { ReactNode, useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface FolderPaginationProps {
  totalCount: number;
  pageSize: number;
  page: number;
}

const FolderPagination = ({
  totalCount,
  pageSize,
  page,
}: FolderPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPageCount = Math.ceil(totalCount / pageSize);

  const buildLink = useCallback(
    (newPage: number) => {
      if (!searchParams) return `${pathname}?currentPage=${newPage}`;
      const params = new URLSearchParams(searchParams.toString());
      params.set("currentPage", newPage.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxPageNumbersToShow = 5;
    const createPageNumber = (pageNum: number) => (
      <PaginationItem className="md:mx-1" key={pageNum}>
        <PaginationLink
          href={buildLink(pageNum)}
          isActive={pageNum === page}
          className={cn(
            "cursor-pointer",
            pageNum === page && "border-primary dark:border-primary",
          )}
        >
          {pageNum}
        </PaginationLink>
      </PaginationItem>
    );

    if (totalPageCount <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(createPageNumber(i));
      }
    } else {
      items.push(createPageNumber(1));

      if (page > 3) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(page + 1, totalPageCount - 1);

      console.log({
        page,
        totalPageCount,
        totalMinusOne: totalPageCount - 1,
        pagePlusOne: page + 1,
        end,
      });

      for (let i = start; i <= end; i++) {
        items.push(createPageNumber(i));
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }
      items.push(createPageNumber(totalPageCount));
    }

    return items;
  };
  return (
    <Pagination className="mt-4 justify-center md:justify-start">
      <PaginationContent>
        <PaginationPrevious
          aria-disabled={page === 1}
          className={cn(
            "border-border",
            page === 1 && "pointer-events-none opacity-50",
          )}
          href={buildLink(Math.max(page - 1, 1))}
        />
        {renderPageNumbers()}
        <PaginationNext
          className={cn(
            "border-border",
            page === totalPageCount && "pointer-events-none opacity-50",
          )}
          href={buildLink(Math.min(page + 1, totalPageCount))}
        />
      </PaginationContent>
    </Pagination>
  );
};

export default FolderPagination;
