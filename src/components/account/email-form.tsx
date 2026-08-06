"use client";

import { Mail, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { updateProfileEmailSchema } from "@/utils/validation/profile";
import { FieldError, FieldGroup } from "../ui/field";
import { updateEmailAction } from "@/actions/user/profile";
import { toast } from "sonner";

const EmailForm = ({ email }: { email: string }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const { control, handleSubmit } = useForm<{ email: string }>({
    resolver: zodResolver(updateProfileEmailSchema),
    defaultValues: {
      email: email,
    },
  });

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setIsUpdating(true);
    const res = await updateEmailAction(data.email);
    if (!res.success) {
      toast.error(res.message || "Nepodarilo sa aktualizovať email.");
    } else {
      toast.success("Email bol úspešne aktualizovaný.");
    }
    setIsUpdating(false);
  };
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 dark:bg-blue-500/20">
          <Mail className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-sm text-muted-foreground">
            Spravujte svoju emailovú adresu
          </p>
        </div>
      </div>
      <form
        className="rounded-lg border bg-slate-100 dark:bg-card p-6 space-y-4"
        id="email-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  {...field}
                  disabled={isUpdating}
                  aria-invalid={fieldState.invalid}
                  placeholder="example@email.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            )}
          />
        </FieldGroup>
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={isUpdating}>
            {isUpdating ? <Loader2 className="animate-spin" /> : "Uložiť zmeny"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EmailForm;
