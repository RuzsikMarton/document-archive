"use client";

import {
  updateProfileAction,
  updateProfilePictureAction,
} from "@/actions/user/profile";
import { updateProfileSchema } from "@/utils/validation/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Edit, Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { CldImage } from "next-cloudinary";
import ImageChangeDialog from "../common/image-change-dialog";
import { SessionUserType } from "@/types/auth";

const AccountSettingsCard = ({ user }: { user: SessionUserType }) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { control, handleSubmit } = useForm<{
    name: string;
    email?: string;
    telephone?: string;
  }>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      telephone: user.telephone || "",
    },
  });

  const onSubmit: SubmitHandler<{
    name: string;
    email?: string;
    telephone?: string;
  }> = async (data) => {
    setIsUpdating(true);
    const email = user.emailVerified ? undefined : data.email;
    const res = await updateProfileAction(data.name, email);
    if (!res.success) {
      toast.error(res.message || "Nepodarilo sa aktualizovať profil.");
    } else {
      toast.success("Profil bol úspešne aktualizovaný.");
    }
    setIsUpdating(false);
    router.refresh();
  };

  const handleSendVerificationEmail = async () => {
    setIsUpdating(true);
    const res = await authClient.sendVerificationEmail({ email: user.email });
    if (!res.data?.status) {
      toast.error("Nepodarilo sa odoslať overovací email.");
    } else {
      toast.success("Overovací email bol úspešne odoslaný.");
    }
    setIsUpdating(false);
  };

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

  return (
    <section className="rounded-lg border bg-slate-100 dark:bg-card p-6 space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-32 h-32">
          <CldImage
            src={user.image || "/public/no-img.webp"}
            alt={user.name || "Profile Image"}
            width={500}
            height={500}
            className="max-w-full max-h-full object-contain rounded-full"
          />
          <div className="absolute right-0 top-0 md:-top-1">
            <Button
              variant="outline"
              size="icon-sm"
              className="dark:bg-neutral-800 dark:hover:bg-neutral-700"
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <ImageChangeDialog
            open={openDialog}
            setOpen={setOpenDialog}
            title="Zmeniť profilový obrázok"
            description="Vyberte nový profilový obrázok."
            uploadImage={async (file) => {
              await uploadProfileImage(file);
            }}
          />
        </div>
        <form
          className="space-y-4 w-full"
          id="profile-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="name" className="text-sm font-medium">
                      Celé meno
                    </FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      {...field}
                      disabled={isUpdating}
                      aria-invalid={
                        fieldState.invalid || fieldState.error
                          ? "true"
                          : "false"
                      }
                      placeholder="Zadajte svoje celé meno"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="email" className="text-sm font-medium">
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      {...field}
                      disabled={isUpdating || user.emailVerified}
                      aria-invalid={fieldState.invalid}
                      placeholder="example@email.com"
                      className={
                        "disabled:cursor-not-allowed disabled:pointer-events-auto"
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="telephone"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <div className="space-y-2">
                    <FieldLabel
                      htmlFor="telephone"
                      className="text-sm font-medium"
                    >
                      Telefónne číslo
                    </FieldLabel>
                    <Input
                      id="telephone"
                      type="text"
                      {...field}
                      disabled={isUpdating}
                      aria-invalid={
                        fieldState.invalid || fieldState.error
                          ? "true"
                          : "false"
                      }
                      placeholder="Zadajte svoje telefónne číslo"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>
      {user.emailVerified ? (
        <div className="mt-4 flex items-start gap-3 border rounded-xl border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
          <div className="flex-center h-10 w-10 shrink-0 rounded-full bg-emerald-500/25 dark:bg-emerald-500/15 text-white">
            <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-emerald-500 dark:text-emerald-300">
              Email overený
            </p>
            <p className="text-sm text-emerald-500 dark:text-emerald-300">
              Teraz sa môžete pripojiť k tímu alebo spoločnosti.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-start gap-3 border rounded-xl border-amber-500/20 bg-amber-500/10 px-4 py-3">
          <div className="flex-center h-10 w-10 shrink-0 rounded-full bg-amber-500/25 dark:bg-amber-500/15 text-white">
            <TriangleAlert className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-orange-500 dark:text-orange-300">
              Email neoverený
            </p>
            <p className="text-sm text-orange-500 dark:text-orange-300">
              Overte svoj email, aby ste sa mohli pripojiť k spoločnosti.
            </p>
          </div>
        </div>
      )}
      <div
        className={cn(
          "mt-4 flex items-center justify-between",
          user.emailVerified && "justify-end",
        )}
      >
        {!user.emailVerified && (
          <Button
            type="button"
            onClick={handleSendVerificationEmail}
            size="sm"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Poslať overovací email"
            )}
          </Button>
        )}
        <Button
          type="submit"
          form="profile-form"
          size="sm"
          disabled={isUpdating}
        >
          {isUpdating ? <Loader2 className="animate-spin" /> : "Uložiť zmeny"}
        </Button>
      </div>
    </section>
  );
};

export default AccountSettingsCard;
