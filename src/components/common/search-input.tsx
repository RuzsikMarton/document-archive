"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <InputGroup className="w-48 sm:w-64 md:w-80">
      <InputGroupInput
        type="text"
        placeholder="Hľadať..."
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          handleSearch(value);
        }}
      />
      <X
        className={cn(
          "cursor-pointer mr-1 text-muted-foreground",
          search ? "visible" : "hidden",
        )}
        onClick={() => {
          setSearch("");
          handleSearch("");
        }}
      />
    </InputGroup>
  );
};

export default SearchInput;
