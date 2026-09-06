"use client";

import { useNewFolderDialog } from "@/providers/new-folder-dialog-provider";
import { Button } from "../ui/button";
import { Download, Funnel, FunnelX, Plus, QrCode } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import SearchInput from "../common/search-input";
import { Folder } from "@/generated/prisma/browser";
import jsPDF from "jspdf";
import { drawFolderLabel } from "@/utils/pdf/draw-folder-label";

const TableFilters = ({
  selectedFolders,
}: {
  selectedFolders: Folder[] | [];
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { openDialog } = useNewFolderDialog();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i));

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
  };

  // Check if there are any active filters
  const hasActiveFilters = (() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    return params.toString().length > 0;
  })();

  const handleDownloadSelected = () => {
    if (selectedFolders.length === 0) return;
    const pages = Math.ceil(selectedFolders.length / 5);
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    for (let i = 0; i < pages; i++) {
      for (let j = 0; j < 5; j++) {
        const folder = selectedFolders[i * 5 + j];
        if (!folder) continue;
        const x = 20 + j * 55;
        drawFolderLabel(doc, folder, x, 30);
      }
      if (i < pages - 1) {
        doc.addPage();
      }
    }
    doc.save(`qrZaznamy_strany_${pages}.pdf`);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
      <div className="flex justify-between md:justify-start gap-2 w-full md:w-auto">
        <Button
          onClick={openDialog}
          className="flex items-center gap-2 cursor-pointer w-full"
        >
          <Plus className="h-4 w-4" />
          Nový záznam
        </Button>
      </div>
      <div className="flex justify-between md:justify-end items-center gap-2 w-full md:w-auto">
        <SearchInput />
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger
              render={
                <button className="flex items-center h-8 gap-1.5 px-2.5 border text-sm border-blue-500 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all dark:border-primary dark:bg-blue-900/50 dark:text-primary dark:hover:bg-blue-800/50 cursor-pointer">
                  <span className="font-medium text-sm hidden lg:block">
                    Filter
                  </span>
                  <Funnel className="w-4 h-4" />
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
            className={`flex items-center h-8 gap-1.5 px-2.5 border text-sm rounded-lg transition-all ${
              hasActiveFilters
                ? "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:border-primary dark:bg-blue-900/50 dark:text-primary dark:hover:bg-blue-800/50 cursor-pointer"
                : "border-border bg-background text-muted-foreground opacity-50 cursor-not-allowed dark:border-input dark:bg-input/30"
            }`}
          >
            <span className="font-medium text-sm hidden lg:block">
              Vyčistiť filtre
            </span>
            <FunnelX className="h-4 w-4" />
          </button>

          <div className="relative">
            <div
              className={cn(
                "absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs",
                selectedFolders.length === 0 && "hidden",
              )}
            >
              {selectedFolders.length}
            </div>
            <button
              disabled={selectedFolders.length === 0}
              className={`flex items-center h-8 gap-1.5 px-2.5 border text-sm rounded-lg transition-all ${
                selectedFolders.length > 0
                  ? "border-blue-500 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:border-primary dark:bg-blue-900/50 dark:text-primary dark:hover:bg-blue-800/50 cursor-pointer"
                  : "border-border bg-background text-muted-foreground opacity-50 cursor-not-allowed dark:border-input dark:bg-input/30"
              }`}
              onClick={handleDownloadSelected}
            >
              <span className="font-medium text-sm hidden lg:block">
                Stiahnuť
              </span>
              <QrCode className="hidden lg:block h-4 w-4" />
              <Download className="block lg:hidden h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
