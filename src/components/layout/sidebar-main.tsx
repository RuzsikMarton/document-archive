"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { SessionUserType } from "@/types/auth";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useNewFolderDialog } from "@/providers/new-folder-dialog-provider";
import { FolderClock, FolderOpen, Gauge, Plus } from "lucide-react";
import { ThemeToggle } from "../common/ThemeToggle";
import Link from "next/link";

const SidebarMain = () => {
  const { openDialog } = useNewFolderDialog();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isPendingFolders =
    pathname === "/folders" && searchParams.get("handedOver") === "false";
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col">
        <SidebarMenu className="mb-2">
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Nový záznam"
              onClick={openDialog}
              className="bg-primary cursor-pointer text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground duration-200"
              render={
                <div className="flex items-center gap-2">
                  <Plus />
                  <span>Nový záznam</span>
                </div>
              }
            />

            <div className="group-data-[collapsible=icon]:hidden">
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
          Navigácia
        </SidebarGroupLabel>
        <SidebarMenu className="flex flex-col gap-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Informačný panel"
              isActive={pathname === "/"}
              render={
                <Link href="/">
                  <Gauge />
                  <span>Informačný panel</span>
                </Link>
              }
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Záznamy"
              isActive={pathname?.startsWith("/folders") && !isPendingFolders}
              render={
                <Link href="/folders">
                  <FolderOpen />
                  <span>Všetky záznamy</span>
                </Link>
              }
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Čakajúce"
              isActive={isPendingFolders}
              render={
                <Link href="/folders?handedOver=false">
                  <FolderClock />
                  <span>Čakajúce záznamy</span>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarMain;
