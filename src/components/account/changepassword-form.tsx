"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/utils/validation/profile";
import z from "zod";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { changePasswordAction } from "@/actions/user/profile";
import { toast } from "sonner";

const ChangePasswordForm = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const { handleSubmit, control } = useForm<
    z.infer<typeof changePasswordSchema>
  >({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof changePasswordSchema>> = async (
    data,
  ) => {
    setIsUpdating(true);
    const res = await changePasswordAction(data);

    if (!res.success) {
      toast.error(res.message || "Nepodarilo sa zmeniť heslo.");
    } else {
      toast.success("Heslo bolo úspešne zmenené.");
    }
    setIsUpdating(false);
  };
  return (
    <section className="rounded-lg border bg-slate-100 dark:bg-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Heslo a bezpečnosť</h2>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="space-y-2">
                  <label
                    htmlFor="current-password"
                    className="text-sm font-medium"
                  >
                    Aktuálne heslo
                  </label>
                  <Input
                    id="current-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Aktuálne heslo"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              </Field>
            )}
          />

          <Controller
            name="newPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium">
                    Nové heslo
                  </label>
                  <Input
                    id="new-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nové heslo"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              </Field>
            )}
          />
          <Controller
            name="confirmNewPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="space-y-2">
                  <label
                    htmlFor="confirm-new-password"
                    className="text-sm font-medium"
                  >
                    Potvrďte nové heslo
                  </label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Potvrďte nové heslo"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </div>
              </Field>
            )}
          />
        </FieldGroup>
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={isUpdating}>
            {isUpdating ? <Loader2 className="animate-spin" /> : "Zmeniť heslo"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ChangePasswordForm;
