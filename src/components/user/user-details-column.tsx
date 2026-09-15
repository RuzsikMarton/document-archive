"use client";

import { CircleCheck, CircleX, Copy, CopyCheck, ImageIcon } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "../ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useSession } from "@/lib/auth-client";

type SetupStep = {
  id: string;
  label: string;
  completed: boolean;
  href?: string;
};

import { UserPageDataType } from "@/types/user";
import ImageChangeDialog from "../common/image-change-dialog";
import Image from "next/image";
import { updateProfilePictureAction } from "@/actions/user/profile";
import { toast } from "sonner";

const UserDetailsCol = ({ user }: { user: UserPageDataType }) => {
  const [copiedMail, setCopiedMail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const session = useSession();
  const router = useRouter();

  const uploadProfileImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "evidio");
    formData.append("folder", "evidio/profilePics");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    const optimizedUrl = data.secure_url.replace(
      "/image/upload/",
      "/image/upload/c_limit,w_500,h_500/q_auto/f_auto/",
    );

    const actionResult = await updateProfilePictureAction(
      user.id,
      optimizedUrl,
    );

    if (!actionResult.success) {
      toast.error(
        actionResult.message || "Chyba pri aktualizácii profilového obrázku.",
      );
    } else {
      toast.success(
        actionResult.message || "Profilový obrázok bol úspešne aktualizovaný.",
      );
    }
    router.refresh();
  };

  const steps: SetupStep[] = [
    {
      id: "registration",
      label: "Registrácia",
      completed: true,
    },
    {
      id: "email",
      label: "Overiť email",
      completed: !!user.emailVerified,
    },
    {
      id: "member",
      label: "Byť členom organizácie",
      completed: user.members.length > 0,
    },
    {
      id: "folder",
      label: "Vytvoriť prvý priečinok",
      completed:
        user.members[0]?.folders && user.members[0]?.folders.length > 0,
    },
  ];

  const completedSteps = steps.filter((step) => step.completed).length;
  const progress = Math.round((completedSteps / steps.length) * 100);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="relative aspect-square w-full max-w-60">
        {user.image ? (
          <CldImage
            src={user.image}
            width={500}
            height={500}
            crop="fill"
            gravity="face"
            alt={user.name}
            loading="lazy"
            className="object-contain max-w-full max-h-full rounded-2xl"
          />
        ) : (
          <Image
            src="/no-img.webp"
            alt="No Image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain rounded-2xl"
            loading="eager"
          />
        )}
      </div>
      {/* Profile pics future content */}
      {(session.data?.user?.id === user.id ||
        session.data?.user.role === "ADMIN") && (
        <>
          <button
            onClick={() => setOpenDialog(true)}
            disabled={
              !(
                session.data?.user?.id === user.id ||
                session.data?.user.role === "ADMIN"
              )
            }
            className="flex items-center font-semibold text-primary text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ImageIcon />
            <span className="ml-2">Zmeniť profilový obrázok</span>
          </button>
          <ImageChangeDialog
            open={openDialog}
            setOpen={setOpenDialog}
            title="Zmeniť profilový obrázok"
            description="Vyberte nový profilový obrázok."
            uploadImage={async (file) => {
              await uploadProfileImage(file);
            }}
          />
        </>
      )}
      <div className="w-full flex flex-col my-4 bg-card rounded-lg p-4">
        <Tooltip>
          <TooltipTrigger
            render={
              <p className="font-semibold text-muted-foreground text-sm">
                Profil je {progress}% dokončený
              </p>
            }
          />

          <TooltipContent>
            <div className="flex flex-col gap-2">
              {steps.map((step) => (
                <div key={step.id} className="flex justify-between gap-2">
                  <span>{step.label}</span>
                  <span>
                    {step.completed ? (
                      <CircleCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <CircleX className="w-4 h-4 text-red-500" />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
        <Progress className="mt-2" value={progress} />
      </div>
      <div className="mt-4 w-full flex flex-col gap-4">
        <p className="font-semibold text-muted-foreground text-sm uppercase">
          Detaily používateľa
        </p>
        <div className="flex flex-col justify-center p-2 w-full bg-card/40 dark:bg-accent rounded-lg">
          <p className="font-semibold text-muted-foreground text-sm">Meno</p>
          <p>{user.name}</p>
        </div>
        <div className="flex items-center justify-between p-2 w-full bg-card/40 dark:bg-accent rounded-lg">
          <div>
            <p className="font-semibold text-muted-foreground text-sm">Email</p>
            <p>{user.email}</p>
          </div>
          <div
            className="cursor-pointer hover:text-primary"
            onClick={() => {
              navigator.clipboard.writeText(user.email);
              setCopiedMail(true);
              setTimeout(() => setCopiedMail(false), 2000);
            }}
          >
            {copiedMail ? (
              <CopyCheck className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between p-2 w-full bg-card/40 dark:bg-accent rounded-lg">
          <div>
            <p className="font-semibold text-muted-foreground text-sm">
              Telefón
            </p>
            <p>{user.telephone ?? "-"}</p>
          </div>
          <div
            className="cursor-pointer hover:text-primary"
            onClick={() => {
              navigator.clipboard.writeText(user.telephone ?? "");
              setCopiedPhone(true);
              setTimeout(() => setCopiedPhone(false), 2000);
            }}
          >
            {copiedPhone ? (
              <CopyCheck className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCol;
