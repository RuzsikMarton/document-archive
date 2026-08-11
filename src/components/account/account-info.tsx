"use client";

import {
  Building2,
  Calendar,
  Copy,
  CopyCheck,
  Info,
  Mail,
  Shield,
} from "lucide-react";
import { useState } from "react";

const AccountInfo = ({
  userId,
  createdAt,
  emailVerified,
  companyName,
}: {
  userId: string;
  createdAt: Date;
  emailVerified: boolean;
  companyName: string | null;
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
          <Info className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Informácie o účte</h2>
          <p className="text-sm text-muted-foreground">
            Zobraziť informácie o svojom účte
          </p>
        </div>
      </div>
      <div className="rounded-lg border bg-slate-100 dark:bg-card p-6 space-y-4">
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
            <span className="text-sm font-medium">Člen od</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Email overený</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {emailVerified ? "Áno" : "Nie"}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Building2 className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Organizácia / Tím</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {companyName || "-"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default AccountInfo;
