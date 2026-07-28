"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, FolderOpen } from "lucide-react";
import Image from "next/image";

const Header = ({ publicSession }: { publicSession: any }) => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <header className="w-full">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src={"/logo-dark-2.webp"}
              alt="Evidio Logo"
              width={128}
              height={128}
              style={{ width: "auto", height: "auto", maxHeight: "128px" }}
              priority
              className="hidden dark:block"
            />
            <Image
              src={"/logo-2.webp"}
              alt="Evidio Logo"
              width={128}
              height={128}
              style={{ width: "auto", height: "auto", maxHeight: "128px" }}
              priority
              className="block dark:hidden"
            />
          </Link>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Section */}
            {isPending ? (
              <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="outline" size="default"></Button>}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {session.user.name || session.user.email?.split("@")[0]}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user.name || "Účet"}
                        </p>
                        {session.user.email && (
                          <p className="text-xs leading-none text-muted-foreground">
                            {session.user.email}
                          </p>
                        )}
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/folders")}>
                      <FolderOpen />
                      Moje Priečinky
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {publicSession?.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => router.push("/admin/users")}
                        >
                          <User />
                          User Management
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut />
                      Odhlásiť sa
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/signin">
                  <Button variant="outline" size="sm">
                    Prihlásiť sa
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Registrovať sa</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
