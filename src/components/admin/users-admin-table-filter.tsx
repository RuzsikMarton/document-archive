"use client";

import { Funnel, FunnelX } from "lucide-react";
import SearchInput from "../common/search-input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldDescription,
} from "../ui/field";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

const UsersAdminTableFilters = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const hasActiveFilters = (() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    return params.toString().length > 0;
  })();

  const handleToggleRole = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const role = params.get("role") || "";
    if (role === value) {
      params.delete("role");
    } else {
      params.set("role", value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleToggleOrganization = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const inOrganization = params.get("inOrganization") || "";
    if (inOrganization === value) {
      params.delete("inOrganization");
    } else {
      params.set("inOrganization", value);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-2">
      <SearchInput />
      <Popover>
        <PopoverTrigger
          render={
            <Button>
              <Funnel />
            </Button>
          }
        />
        <PopoverContent className="w-50" align="start">
          <FieldSet>
            <FieldDescription>Rola</FieldDescription>
            <FieldGroup>
              <Field
                orientation={"horizontal"}
                className={cn(
                  "visible",
                  searchParams.get("role") === "user" && "hidden",
                )}
              >
                <Checkbox
                  value="admin"
                  checked={searchParams.get("role") === "admin"}
                  onClick={() => handleToggleRole("admin")}
                />
                <FieldLabel>Admin</FieldLabel>
              </Field>
              <Field
                orientation={"horizontal"}
                className={cn(
                  "visible",
                  searchParams.get("role") === "admin" && "hidden",
                )}
              >
                <Checkbox
                  value="user"
                  checked={searchParams.get("role") === "user"}
                  onClick={() => handleToggleRole("user")}
                />
                <FieldLabel>Uživatel</FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Separator />
          <FieldSet>
            <FieldDescription>Organizácia</FieldDescription>

            <FieldGroup>
              <Field
                orientation={"horizontal"}
                className={cn(
                  "visible",
                  searchParams.get("inOrganization") === "out" && "hidden",
                )}
              >
                <Checkbox
                  id="in"
                  value="in"
                  checked={searchParams.get("inOrganization") === "in"}
                  onClick={() => handleToggleOrganization("in")}
                />
                <FieldLabel htmlFor="in">S organizáciou</FieldLabel>
              </Field>
              <Field
                orientation={"horizontal"}
                className={cn(
                  "visible",
                  searchParams.get("inOrganization") === "in" && "hidden",
                )}
              >
                <Checkbox
                  id="out"
                  value="out"
                  checked={searchParams.get("inOrganization") === "out"}
                  onClick={() => handleToggleOrganization("out")}
                />
                <FieldLabel htmlFor="out">Bez organizácie</FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </PopoverContent>
      </Popover>
      <Button
        variant={hasActiveFilters ? "destructive" : "outline"}
        disabled={!hasActiveFilters}
        onClick={() => {
          const params = new URLSearchParams();
          replace(`${pathname}?${params.toString()}`);
        }}
      >
        <FunnelX />
      </Button>
    </div>
  );
};

export default UsersAdminTableFilters;
