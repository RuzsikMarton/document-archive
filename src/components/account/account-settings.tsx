"use client";

import { updateProfileAction } from "@/actions/user/profile";
import { updateProfileSchema } from "@/utils/validation/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const AccountSettingsCard = ({
  name,
  email,
  emailVerified,
}: {
  name: string;
  email: string;
  emailVerified: boolean;
}) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const { control, handleSubmit } = useForm<{ name: string; email?: string }>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
    },
  });

  const onSubmit: SubmitHandler<{ name: string; email?: string }> = async (
    data,
  ) => {
    setIsUpdating(true);
    const email = emailVerified ? undefined : data.email;
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
    const res = await authClient.sendVerificationEmail({ email: email });
    if (!res.data?.status) {
      toast.error("Nepodarilo sa odoslať overovací email.");
    } else {
      toast.success("Overovací email bol úspešne odoslaný.");
    }
    setIsUpdating(false);
  };
  return (
    <section className="rounded-lg border bg-slate-100 dark:bg-card p-6 space-y-4">
      <form
        className="space-y-4"
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
                      fieldState.invalid || fieldState.error ? "true" : "false"
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
                    disabled={isUpdating || emailVerified}
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
        {emailVerified ? (
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
            emailVerified && "justify-end",
          )}
        >
          {!emailVerified && (
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
          <Button type="submit" size="sm" disabled={isUpdating}>
            {isUpdating ? <Loader2 className="animate-spin" /> : "Uložiť zmeny"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AccountSettingsCard;
