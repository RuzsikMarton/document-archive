"use client";

import { Calendar, Copy, CopyCheck, Shield, UserShield } from "lucide-react";
import { useState } from "react";

const AccountInfo = ({
  userId,
  createdAt,
  role,
}: {
  userId: string;
  createdAt: Date;
  role: "ADMIN" | "USER" | undefined;
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="space-y-4">
      <div className="rounded-lg border bg-slate-100 dark:bg-card p-6 space-y-4">
        <h2 className="text-xl font-semibold">Informácie o účte</h2>
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">ID účtu</span>
          </div>
          <span className="flex gap-1 text-xs text-muted-foreground font-mono ">
            {userId.substring(0, 16)}...
            <button
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => handleCopy(userId)}
            >
              {copied ? <CopyCheck size={16} /> : <Copy size={16} />}
            </button>
          </span>
        </div>
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Členom od</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <UserShield className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Rola</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {role === "ADMIN" ? "Administrátor" : "Používateľ"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;
