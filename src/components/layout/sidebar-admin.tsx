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
import { Building2, Users } from "lucide-react";
import Link from "next/link";

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Používatelia"
              isActive={pathname === "/admin/users"}
              render={
                <Link href="/admin/users">
                  <Users />
                  <span>Používatelia</span>
                </Link>
              }
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Organizácie"
              isActive={pathname === "/admin/organizations"}
              render={
                <Link href="/admin/organizations">
                  <Building2 />
                  <span>Organizácie</span>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default AdminSidebar;
