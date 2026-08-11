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
import { usePathname, useSearchParams } from "next/navigation";

const SidebarBottom = ({ ...props }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isGettingStarted =
    pathname === "/help" && searchParams.get("topic") === "getting-started";
  const disabled = true;
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Pomocník"
              isActive={pathname === "/help" && !isGettingStarted}
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
              isActive={isGettingStarted}
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
              isActive={pathname === "/kontakt"}
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
              isActive={pathname === "/settings"}
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
