"use client";

import { Contact, HelpCircle, Rocket, Settings } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SidebarBottom = ({ ...props }) => {
  const disabled = true;
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Pomocník"
              render={
                <Link href="/help">
                  <HelpCircle />
                  <span>Pomocník</span>
                </Link>
              }
            />
          </SidebarMenuItem>
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <SidebarMenuButton
              tooltip="Začíname"
              render={
                <Link href="/help?topic=getting-started">
                  <Rocket />
                  <span>Začíname</span>
                </Link>
              }
            />
          </SidebarMenuItem>
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <SidebarMenuButton
              tooltip="Kontakt"
              render={
                <Link href="/kontakt">
                  <Contact />
                  <span>Kontakt</span>
                </Link>
              }
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Nastavenia"
              className={cn(disabled && "pointer-events-none opacity-50")}
              disabled={disabled}
              render={disabled ? undefined : <Link href="/settings" />}
            >
              <Settings />
              <span>Nastavenia</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarBottom;
