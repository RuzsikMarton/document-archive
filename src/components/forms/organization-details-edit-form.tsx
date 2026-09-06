"use client";

import { editOrganizationSchema } from "@/utils/validation/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Organization } from "@/generated/prisma/browser";
import { EditOrganizationFormData } from "@/types/organization";
import { EditOrganizationDetailsAction } from "@/actions/organization/organization";
import { toast } from "sonner";

const OrganizationDetailsEditForm = ({
  organization,
}: {
  organization: Organization;
}) => {
  const {
    handleSubmit,
    control,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<EditOrganizationFormData>({
    resolver: zodResolver(editOrganizationSchema),
    defaultValues: {
      name: organization.name || "",
      ico: organization.ico || "",
      dic: organization.dic || "",
      address: organization.address || "",
      city: organization.city || "",
      postalCode: organization.postalCode || "",
      email: organization.email || "",
      telephone: organization.telephone || "",
      website: organization.website || "",
    },
  });

  const onSubmit: SubmitHandler<EditOrganizationFormData> = async (data) => {
    clearErrors();
    const res = await EditOrganizationDetailsAction(data);
    if (!res.success) {
      toast.error(res.message || "Chyba pri aktualizácii organizácie.");
    } else {
      toast.success(res.message || "Organizácia bola úspešne aktualizovaná.");
    }
  };
  return (
    <div className="w-full lg:w-2/3 rounded-lg border bg-slate-100 p-6 space-y-4 dark:bg-slate-800  dark:border-slate-700">
      <h1 className="text-lg font-semibold">Detaily firmy</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Name - full width */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                className="lg:col-span-2"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel htmlFor="organization-name">Názov firmy</FieldLabel>
                <Input
                  id="organization-name"
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  placeholder="Zadajte názov firmy"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* IČO */}
          <Controller
            name="ico"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="organization-ico">IČO</FieldLabel>
                <Input
                  id="organization-ico"
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  placeholder="pr.: 12345678"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* DIČ */}
          <Controller
            name="dic"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="organization-dic">DIČ</FieldLabel>
                <Input
                  id="organization-dic"
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  placeholder="pr.: 1234567890"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Address - full width */}
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                className="lg:col-span-2"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel htmlFor="organization-address">Adresa</FieldLabel>
                <Input
                  id="organization-address"
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  placeholder="pr.: Hlavná 123"
                  autoComplete="street-address"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* City */}
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="organization-city">Mesto</FieldLabel>
                <Input
                  id="organization-city"
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  placeholder="pr.: Bratislava"
                  autoComplete="address-level2"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Postal code */}
          <Controller
            name="postalCode"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="organization-postal-code">PSČ</FieldLabel>
                <Input
                  id="organization-postal-code"
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  placeholder="pr.: 12345"
                  autoComplete="postal-code"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="lg:col-span-2"
              >
                <FieldLabel htmlFor="organization-email">E-mail</FieldLabel>
                <Input
                  id="organization-email"
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  placeholder="info@example.sk"
                  autoComplete="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Telephone */}
          <Controller
            name="telephone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="organization-telephone">
                  Telefón
                </FieldLabel>
                <Input
                  id="organization-telephone"
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  placeholder="+421 900 123 456"
                  autoComplete="tel"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Website */}
          <Controller
            name="website"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="organization-website">
                  Webová stránka
                </FieldLabel>
                <Input
                  id="organization-website"
                  {...field}
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  placeholder="https://example.sk"
                  autoComplete="url"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Uložiť zmeny"}
        </Button>
      </form>
    </div>
  );
};

export default OrganizationDetailsEditForm;
