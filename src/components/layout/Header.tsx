"use client";

import Link from "next/link";
import { ThemeToggle } from "../common/ThemeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  {
    /*const { data: session } = useSession();
  const router = useRouter();

  // Use client session for user data, server session for role (avoids hydration issues)
  const currentUser = publicSession?.user || session?.user;
  const currentRole = publicSession?.role;
  const userEmail = session?.user?.email;
  const companyId = session?.user?.companyName;

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };*/
  }

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

            <div className="flex items-center gap-2">
              <Link href="/signin">
                <Button>Prihlásiť sa</Button>
              </Link>
              {/*<Link href="/signup">
                <Button variant="outline" size="sm">Registrovať sa</Button>
              </Link>*/}
            </div>
            {/* Auth Section 
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="outline" size="default"></Button>}
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {currentUser.name || userEmail?.split("@")[0] || "User"}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {currentUser.name || "Účet"}
                        </p>
                        {userEmail && (
                          <p className="text-xs leading-none text-muted-foreground">
                            {userEmail}
                          </p>
                        )}
                        {companyId && (
                          <p className="text-xs leading-none mt-1 text-muted-foreground">
                            {companyId
                              ? `Spoločnosť: ${companyId}`
                              : "Žiadna spoločnosť"}
                          </p>
                        )}
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/folders")}>
                      <FolderOpen />
                      Všetky záznamy
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/help")}>
                      <HelpCircle />
                      Pomocník
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/account/settings")}
                    >
                      <Settings />
                      Nastavenia účtu
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {currentRole === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => router.push("/admin/users")}
                        >
                          <Users />
                          Manage Users
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => router.push("/admin/company")}
                        >
                          <Building2Icon />
                          Manage Companies
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
            )}*/}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
