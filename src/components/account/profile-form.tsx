"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2, User } from "lucide-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileNameSchema } from "@/utils/validation/profile";
import { updateProfileAction } from "@/actions/user/profile";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useRouter } from "next/navigation";

const ProfileForm = ({ name }: { name: string }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const { handleSubmit, control } = useForm<
    z.infer<typeof updateProfileNameSchema>
  >({
    resolver: zodResolver(updateProfileNameSchema),
    defaultValues: {
      name: name,
    },
  });

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    setIsUpdating(true);
    const res = await updateProfileAction(data.name);
    if (!res.success) {
      toast.error(res.message || "Nepodarilo sa aktualizovať profil.");
    } else {
      toast.success("Profil bol úspešne aktualizovaný.");
    }
    setIsUpdating(false);
    router.refresh();
  };
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
          <User className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Informácie o profile</h2>
          <p className="text-sm text-muted-foreground">
            Aktualizujte svoje osobné údaje
          </p>
        </div>
      </div>
      <form
        id="profile-form"
        className="rounded-lg border bg-slate-100 dark:bg-card p-6 space-y-4"
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
        <div className="flex justify-end">
          <Button type="submit" size="sm" disabled={isUpdating}>
            {isUpdating ? <Loader2 className="animate-spin" /> : "Uložiť zmeny"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
