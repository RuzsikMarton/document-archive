"use client";

import { Organization } from "@/generated/prisma/client";
import { OrganizationStatsResult } from "@/types/organization";
import { Separator } from "../ui/separator";
import ImageChangeDialog from "../common/image-change-dialog";
import { CldImage } from "next-cloudinary";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { updateOrganizationLogoAction } from "@/actions/organization/organization";

const OwnerOrganizationStats = ({
  organization,
  stats,
}: {
  organization: Organization;
  stats: OrganizationStatsResult;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const uploadOrganizationLogo = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "evidio");
    formData.append("folder", "evidio/organizationLogos");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error?.message || "Cloudinary upload failed");
      return;
    }

    const optimizedUrl = data.secure_url.replace(
      "/image/upload/",
      "/image/upload/c_limit,w_500,h_500/q_auto/f_auto/",
    );

    const actionResult = await updateOrganizationLogoAction(optimizedUrl);

    if (!actionResult.success) {
      toast.error(
        actionResult.message || "Chyba pri aktualizácii loga organizácie.",
      );
    } else {
      toast.success(
        actionResult.message || "Logo organizácie bolo úspešne aktualizované.",
      );
    }
  };

  return (
    <div className="w-full lg:w-1/3 flex-1 rounded-lg border bg-muted p-6 space-y-2 dark:bg-card dark:border-slate-700 shadow-sm">
      <Label>Logo organizácie</Label>
      {organization.logo ? (
        <div className="flex flex-col items-center">
          <div className="flex h-32 w-50 items-center justify-center">
            <CldImage
              src={organization.logo}
              alt={organization.name}
              width={500}
              height={500}
              crop="limit"
              className="max-h-full max-w-full object-contain"
              sizes="100vw"
              loading="lazy"
            />
          </div>
          <Button variant="destructive" onClick={() => setOpenDialog(true)}>
            Zmeniť logo
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Button onClick={() => setOpenDialog(true)}>Nahrať logo</Button>
          <span className="mt-1 text-muted-foreground text-xs">
            Žiadne logo
          </span>
        </div>
      )}
      <ImageChangeDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Zmeniť logo organizácie"
        description="Nahrajte nové logo pre organizáciu."
        uploadImage={(file) => uploadOrganizationLogo(file)}
      />
      <h1 className="text-lg font-semibold mt-8">Štatistiky organizácie</h1>
      <p className="font-semibold text-primary/90">
        Vytvorená: {organization.createdAt.toLocaleDateString()}
      </p>
      <div className="space-y-2 mt-4">
        <p className="text-sm font-semibold text-foreground">Zamestnanci</p>
        <Separator className="my-1" />
        <div className="flex justify-between items-center gap-0.5">
          <span className="text-muted-foreground text-sm">
            Celkový počet zamestnancov:{" "}
          </span>
          <span className="font-semibold">{stats?.employees || "-"}</span>
        </div>
      </div>
      <div className="space-y-2 mt-4">
        <p className="text-sm font-semibold text-foreground">Dokumenty</p>
        <Separator className="my-1" />
        <div className="flex justify-between items-center gap-0.5">
          <span className="text-muted-foreground text-sm">
            Celkový počet záznamov:{" "}
          </span>
          <span className="font-semibold">{stats?.folders || "-"}</span>
        </div>
        <div className="flex justify-between items-center gap-0.5">
          <span className="text-muted-foreground text-sm">
            Záznamy tento rok:{" "}
          </span>
          <span className="font-semibold">{stats?.foldersThisYear || "-"}</span>
        </div>
        <div className="flex justify-between items-center gap-0.5">
          <span className="text-muted-foreground text-sm">
            Odovzdané dokumenty:{" "}
          </span>
          <span className="font-semibold">
            {stats?.handedOverFolders || "-"}
          </span>
        </div>
        <div className="flex justify-between items-center gap-0.5">
          <span className="text-muted-foreground text-sm">
            Neodovzdané dokumenty:{" "}
          </span>
          <span className="font-semibold">{stats?.notHanded || "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default OwnerOrganizationStats;
