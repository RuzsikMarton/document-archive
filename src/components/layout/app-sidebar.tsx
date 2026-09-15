"use client";

import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  ChevronDown,
  ChevronRight,
  Loader2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "../ui/sidebar";
import SidebarBottom from "./sidebar-bottom";
import SidebarMain from "./sidebar-main";
import SidebarUser from "./sidebar-user";
import Link from "next/link";
import { SessionUserType } from "@/types/auth";
import OrganizationSidebar from "./sidebar-organization";
import AdminSidebar from "./sidebar-admin";
import { OrganizationList } from "@/types/organization";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { changeActiveOrganizationAction } from "@/actions/organization/organization";
import { toast } from "sonner";
import { CldImage } from "next-cloudinary";

const AppSidebar = ({
  user,
  organizations,
}: {
  user: SessionUserType;
  organizations: OrganizationList;
}) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleChangeActiveOrganization = async (
    orgId: string,
    orgSlug: string,
  ) => {
    if (
      user.organization?.id === orgId &&
      user.organization?.slug === orgSlug
    ) {
      return;
    }
    setPending(true);
    const res = await changeActiveOrganizationAction(orgId, orgSlug);
    if (!res.success) {
      toast.error(res.message || "Failed to change active organization");
      setPending(false);
      return;
    }
    toast.success(res.message || "Active organization changed successfully");
    setPending(false);
    router.push("/dashboard");
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            {organizations.length === 0 ? (
              <SidebarMenuButton
                size="lg"
                className="h-auto min-h-12 bg-primary/10 py-2"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary">
                  <BriefcaseBusiness className="size-4" />
                </div>

                <Link
                  href="/help?topic=getting-started"
                  className="grid flex-1 text-left text-sm leading-tight"
                >
                  <span className="truncate font-medium">Žiadny tím</span>

                  <span className="truncate text-xs text-primary">
                    Vytvoriť alebo pripojiť sa
                  </span>
                </Link>

                <ChevronRight className="ml-auto size-4 text-muted-foreground" />
              </SidebarMenuButton>
            ) : organizations.length === 1 ? (
              <SidebarMenuButton
                size="lg"
                className="h-auto min-h-12 bg-primary/10 py-2"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary">
                  {organizations[0].logo ? (
                    <CldImage
                      src={organizations[0].logo}
                      alt={organizations[0].name}
                      width={500}
                      height={500}
                      crop="limit"
                      className="max-h-full max-w-full object-contain"
                      sizes="200px"
                    />
                  ) : (
                    <BriefcaseBusiness className="size-4" />
                  )}
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {organizations[0].name}
                  </span>
                </div>
              </SidebarMenuButton>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      className="h-auto min-h-12 cursor-pointer bg-primary/10 py-2"
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary">
                        {user.organization?.logo ? (
                          <CldImage
                            src={user.organization?.logo}
                            alt={user.organization?.name}
                            width={500}
                            height={500}
                            crop="limit"
                            className="max-h-full max-w-full object-contain"
                            sizes="200px"
                            loading="lazy"
                          />
                        ) : (
                          <BriefcaseBusiness className="size-4" />
                        )}
                      </div>

                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user.organization?.name}
                        </span>
                        <span className="truncate text-muted-foreground">
                          {user.organization?.role === "owner"
                            ? "Vlastník"
                            : user.organization?.role === "admin"
                              ? "Administrátor"
                              : "Člen"}
                        </span>
                      </div>
                      {pending ? (
                        <Loader2 className="ml-auto size-4 text-muted-foreground animate-spin" />
                      ) : (
                        <ChevronDown className="ml-auto size-4 text-muted-foreground" />
                      )}
                    </SidebarMenuButton>
                  }
                />

                <DropdownMenuContent>
                  {organizations.map((org) => (
                    <DropdownMenuItem
                      key={org.id}
                      disabled={pending}
                      onClick={() =>
                        handleChangeActiveOrganization(org.id, org.slug)
                      }
                    >
                      <div className="flex items-center">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary">
                          {org.logo ? (
                            <CldImage
                              src={org.logo}
                              alt={org.name}
                              width={500}
                              height={500}
                              crop="limit"
                              className="max-h-full max-w-full object-contain"
                              sizes="200px"
                              loading="lazy"
                            />
                          ) : (
                            <BriefcaseBusiness className="size-4" />
                          )}
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                          <span className="truncate font-semibold">
                            {org.name}
                          </span>
                        </div>
                      </div>
                      {org.id === user.organization?.id && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          Aktívna
                        </span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain />
        {user.organization?.id && (
          <>
            <SidebarSeparator />
            <OrganizationSidebar role={user.organization.role} />
          </>
        )}
        {user.role === "ADMIN" && (
          <>
            <SidebarSeparator />
            <AdminSidebar />
          </>
        )}
        <SidebarBottom className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
