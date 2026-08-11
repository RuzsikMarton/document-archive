"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { ArrowLeft } from "lucide-react";

const SiteHeader = ({
  title,
  showTrigger = true,
  showDate = true,
  showButton,
}: {
  title?: string;
  showTrigger?: boolean;
  showDate?: boolean;
  showButton?: { href: string; text: string };
}) => {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear ">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 py-2">
        {showTrigger && (
          <>
            {" "}
            <SidebarTrigger className="-ml-1" size="lg" />
            <Separator orientation="vertical" className="mx-2" />
          </>
        )}

        {title && <h1 className="text-base md:text-lg font-medium">{title}</h1>}

        <div className="ml-auto flex items-center gap-4">
          {showDate && (
            <div className="text-right gap-1">
              <span className="text-sm uppercase tracking-wide font-medium text-slate-500 dark:text-slate-400">
                {new Date().toLocaleDateString("sk-SK", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <span className="text-sm font-medium">
                {" "}
                {new Date().getFullYear()}
              </span>
            </div>
          )}
          {showButton && (
            <Link href={showButton.href}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="size-4" />
                {showButton.text}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
