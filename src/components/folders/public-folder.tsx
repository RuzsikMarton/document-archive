"use client";

import { CldImage } from "next-cloudinary";
import { FolderWithOrganization } from "@/types/folder";
import { Textarea } from "../ui/textarea";
import { PublicFolderHeader } from "./public-folder-header";
import Image from "next/image";

const months = [
  "Január",
  "Február",
  "Marec",
  "Apríl",
  "Máj",
  "Jún",
  "Júl",
  "August",
  "September",
  "Október",
  "November",
  "December",
];

function formatPeriod(
  monthFrom: number | null,
  monthTo: number | null,
  year: number,
) {
  if (!monthFrom && !monthTo) {
    return year.toString();
  }

  if (monthFrom && monthTo) {
    return `${months[monthFrom - 1]} – ${months[monthTo - 1]} ${year}`;
  }

  if (monthFrom) {
    return `Od ${months[monthFrom - 1]} ${year}`;
  }

  return `Do ${months[monthTo! - 1]} ${year}`;
}

function formatDate(date: Date | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("sk-SK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function PublicFolderView({
  isLoggedIn,
  folder,
}: {
  isLoggedIn: boolean;
  folder: FolderWithOrganization;
}) {
  const hasContact =
    folder.organization?.email ||
    folder.organization?.telephone ||
    folder.organization?.website;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <PublicFolderHeader id={folder.id} isLoggedIn={isLoggedIn} />
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-3">
          <section className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 dark:bg-card shadow-sm md:col-span-2">
            <div className="border-b border-border/70 px-6 py-7 sm:px-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Verejný záznam
              </p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {folder.name}
              </h1>
            </div>
            <div className="grid gap-6 px-6 py-7 sm:grid-cols-2 sm:px-10">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Názov/Firma
                </p>
                <p className="font-medium">{folder.name}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Obdobie
                </p>
                <p className="font-medium">
                  {formatPeriod(folder.monthFrom, folder.monthTo, folder.year)}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Odovzdané
                </p>
                <p className="font-medium">
                  {folder.handedOver
                    ? formatDate(folder.handedOverAt)
                    : "Nie je odovzdané"}
                </p>
              </div>
            </div>
            {folder.contents && (
              <div className="border-t border-border/70 px-6 py-7 sm:px-10">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Obsah
                </p>
                <Textarea
                  readOnly
                  className="min-h-32 resize-none bg-muted/30"
                  value={folder.contents}
                />
              </div>
            )}
          </section>
          <aside className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 dark:bg-card shadow-sm">
            <div className="px-6 py-7 sm:px-8">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Vytvoril
              </p>
              <p className="text-xl font-semibold tracking-tight">
                {folder.organization?.name || "Neznámy"}
              </p>
              {hasContact ? (
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {folder.organization?.email && (
                    <li className="wrap-break-word">
                      Email: {folder.organization.email}
                    </li>
                  )}
                  {folder.organization?.telephone && (
                    <li>Telefón: {folder.organization.telephone}</li>
                  )}
                  {folder.organization?.website && (
                    <li>Web: {folder.organization.website}</li>
                  )}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Žiadny kontakt</p>
              )}
            </div>
            <div className="px-6 py-4    sm:px-8">
              <div className="flex w-full items-center justify-center rounded-xl border border-border/70 bg-muted/30 dark:bg-muted-foreground/30 p-3">
                <CldImage
                  src={folder.organization?.logo || ""}
                  alt={folder.organization?.name || "Neznámy"}
                  width={500}
                  height={500}
                  sizes="100vw"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {folder.qrCodeImage && (
              <div className="border-t border-border/70 px-6 py-6 sm:px-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  QR kód
                </p>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border/70 bg-transparent">
                  <Image
                    src={folder.qrCodeImage}
                    alt={`QR kód pre ${folder.name}`}
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
              </div>
            )}
          </aside>
        </div>
        {/* Evidio footer */}
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Evidio · Digitálna evidencia šanónov
          </p>
        </div>
      </div>
    </main>
  );
}
