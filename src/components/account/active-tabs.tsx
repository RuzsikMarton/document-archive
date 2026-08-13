import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActiveTabsProps {
  tab: string;
}
//CURRENTLY UNUSED

export function ActiveTabs({ tab }: ActiveTabsProps) {
  const tabs = [
    {
      id: "profil",
      label: "Profil",
      href: "/account",
      disabled: false,
    },
    {
      id: "bezpecnost",
      label: "Bezpečnosť",
      href: "/account?tab=bezpecnost",
      disabled: false,
    },
    {
      id: "preferencie",
      label: "Preferencie",
      href: "/account?tab=preferencie",
      disabled: true,
    },
  ];

  return (
    <div className="border-b border-border">
      <nav className="flex gap-6 px-2" aria-label="Tabs">
        {tabs.map((item) => (
          <div key={item.id}>
            {item.disabled ? (
              <span
                className={cn(
                  "inline-flex items-center border-b-2 border-transparent px-1 pb-1 pt-2 md:text-sm font-medium transition-colors",
                  "text-muted-foreground cursor-not-allowed opacity-50",
                )}
                aria-disabled="true"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "inline-flex items-center border-b-2 px-1 pb-1 pt-2 md:text-sm font-medium transition-colors",
                  tab === item.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
                aria-current={tab === item.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
