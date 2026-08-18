"use client";

import { BriefcaseBusiness, ChevronRight } from "lucide-react";
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

const AppSidebar = ({ user }: { user: SessionUserType }) => {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <SidebarMenuButton
              size="lg"
              className="h-auto min-h-12 py-2 bg-primary/10"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/20 text-primary">
                <BriefcaseBusiness className="size-4" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                {user.organization ? (
                  <>
                    <span className="truncate font-semibold">
                      {user.organization.name}
                    </span>

                    <span className="truncate text-xs text-muted-foreground">
                      {user.organization.role === "owner"
                        ? "Majiteľ"
                        : "Zamestnanec"}
                    </span>
                  </>
                ) : (
                  <Link
                    href="/help?topic=getting-started"
                    className="grid flex-1 text-left text-sm leading-tight"
                  >
                    <span className="truncate font-medium">Žiadny tím</span>

                    <span className="truncate text-xs text-primary">
                      Vytvoriť alebo pripojiť sa
                    </span>
                  </Link>
                )}
              </div>
              {!user.organization && (
                <ChevronRight className="ml-auto size-4 text-muted-foreground" />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain user={user} />
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
