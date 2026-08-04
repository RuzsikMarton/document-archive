"use client";

import { useNewFolderDialog } from "@/providers/new-folder-dialog-provider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Funnel, FunnelX, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

const TableFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { openDialog } = useNewFolderDialog();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i));

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleToggleYears = (year: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const years = params.get("years")?.split(",").map(Number) || [];

    const newYears = years.includes(Number(year))
      ? years.filter((y) => y !== Number(year))
      : [...years, Number(year)];

    if (newYears.length === 0) {
      params.delete("years");
    } else {
      params.set("years", newYears.join(","));
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleToggleHandedOver = (handedOver: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentHandedOver = params.get("handedOver") || "";
    if (currentHandedOver === "true" || currentHandedOver === "false") {
      params.delete("handedOver");
    } else {
      params.set("handedOver", handedOver === "true" ? "true" : "false");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams();
    replace(`${pathname}?${params.toString()}`);
    // Clear the input field
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  // Check if there are any active filters
  const hasActiveFilters = searchParams.toString().length > 0;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
      <div>
        <Button onClick={openDialog} className="flex items-center gap-2 h-12">
          <Plus className="h-4 w-4" />
          Nový záznam
        </Button>
      </div>
      <div className="flex justify-between md:justify-end items-center gap-2 w-full md:w-auto">
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Hľadať..."
          className="w-48 sm:w-64 md:w-80 h-12"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger
              render={
                <button className="flex items-center gap-2 py-3 px-4 border border-blue-500 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all dark:border-primary dark:bg-blue-900/50 dark:text-primary dark:hover:bg-blue-800/50">
                  <span className="font-medium text-sm hidden md:block">
                    Filter
                  </span>
                  <Funnel className="h-5 w-5 md:w-4 md:h-4" />
                </button>
              }
            />
            <PopoverContent className="w-56">
              <ScrollArea className="h-80">
                <div className=" p-2 space-y-4">
                  <FieldSet>
                    <FieldDescription>Odovzdanie</FieldDescription>
                    <FieldGroup>
                      <div
                        className={cn(
                          "block",
                          searchParams.get("handedOver") === "false" &&
                            "hidden",
                        )}
                      >
                        <Field orientation="horizontal">
                          <Checkbox
                            id="handed-over"
                            name="handed-over"
                            value="true"
                            checked={searchParams.get("handedOver") === "true"}
                            onCheckedChange={() =>
                              handleToggleHandedOver("true")
                            }
                          />
                          <FieldLabel>Odovzdané</FieldLabel>
                        </Field>
                      </div>
                      <div
                        className={cn(
                          "block",
                          searchParams.get("handedOver") === "true" && "hidden",
                        )}
                      >
                        <Field orientation="horizontal">
                          <Checkbox
                            id="not-handed-over"
                            name="handed-over"
                            value="false"
                            checked={searchParams.get("handedOver") === "false"}
                            onCheckedChange={() =>
                              handleToggleHandedOver("false")
                            }
                          />
                          <FieldLabel>Neodovzdané</FieldLabel>
                        </Field>
                      </div>
                    </FieldGroup>
                  </FieldSet>
                  <Separator />
                  <FieldSet>
                    {" "}
                    <FieldDescription>Rok</FieldDescription>
                    <FieldGroup>
                      {years.map((year) => (
                        <Field key={year} orientation="horizontal">
                          <Checkbox
                            id={`year-${year}`}
                            name="year"
                            value={year}
                            checked={
                              searchParams
                                .get("years")
                                ?.split(",")
                                .includes(year) || false
                            }
                            onCheckedChange={() => handleToggleYears(year)}
                          />
                          <FieldLabel>{year}</FieldLabel>
                        </Field>
                      ))}
                    </FieldGroup>
                  </FieldSet>
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
          <button
            onClick={handleClearFilters}
            disabled={!hasActiveFilters}
            className={`flex items-center gap-2 py-3 px-4 border rounded-lg transition-all ${
              hasActiveFilters
                ? "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:border-primary dark:bg-blue-900/50 dark:text-primary dark:hover:bg-blue-800/50"
                : "border-border bg-background text-muted-foreground opacity-50 cursor-not-allowed dark:border-input dark:bg-input/30"
            }`}
          >
            <span className="font-medium text-sm hidden md:block">
              Vyčistiť filtre
            </span>
            <FunnelX className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
