"use client";

import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Building, UsersRound } from "lucide-react";
import Link from "next/link";

const OrganizationSidebar = ({ role }: { role: string }) => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Organizácia</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Organizácia"
              isActive={pathname === "/organization"}
              render={
                <Link href="/organization">
                  <Building />
                  <span>Organizácia</span>
                </Link>
              }
            />
          </SidebarMenuItem>
          {role === "owner" && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Zamestnanci"
                isActive={pathname === "/organization/employees"}
                render={
                  <Link href="/organization/employees">
                    <UsersRound />
                    <span>Zamestnanci</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default OrganizationSidebar;
