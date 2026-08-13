"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { SessionUserType } from "@/types/auth";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useNewFolderDialog } from "@/providers/new-folder-dialog-provider";
import { FolderClock, FolderOpen, Gauge, Plus } from "lucide-react";
import { ThemeToggle } from "../common/ThemeToggle";
import Link from "next/link";

const SidebarMain = ({ user }: { user: SessionUserType }) => {
  const { openDialog } = useNewFolderDialog();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isPendingFolders =
    pathname === "/folders" && searchParams.get("handedOver") === "false";
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Nový záznam"
              onClick={openDialog}
              className="duration-200 ease-linear
    justify-center
    bg-primary text-primary-foreground
    hover:bg-primary/90 hover:text-primary-foreground

    group-data-[collapsible=icon]:size-8
    group-data-[collapsible=icon]:justify-center
    group-data-[collapsible=icon]:p-0
  "
            >
              <Plus />

              <span className="group-data-[collapsible=icon]:hidden">
                Nový záznam
              </span>
            </SidebarMenuButton>

            <div className="group-data-[collapsible=icon]:hidden">
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
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
