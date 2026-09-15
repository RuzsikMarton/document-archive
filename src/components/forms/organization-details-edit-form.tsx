"use client";

import { editOrganizationSchema } from "@/utils/validation/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import {
  Building2,
  Globe,
  Hash,
  Loader2,
  Mail,
  MapPin,
  MapPinHouse,
  MapPinned,
  Phone,
} from "lucide-react";
import { Organization } from "@/generated/prisma/browser";
import { EditOrganizationFormData } from "@/types/organization";
import { EditOrganizationDetailsAction } from "@/actions/organization/organization";
import { toast } from "sonner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

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
    <div className="w-full lg:w-2/3 rounded-lg border bg-muted p-6 space-y-4 dark:bg-card dark:border-slate-700 shadow-sm">
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
                <FieldLabel htmlFor="organization-name">
                  Názov firmy *
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="organization-name"
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="Zadajte názov firmy"
                  />
                  <InputGroupAddon>
                    <Building2 />
                  </InputGroupAddon>
                </InputGroup>
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
                <InputGroup>
                  <InputGroupAddon>
                    <Hash />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="organization-ico"
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="pr.: 12345678"
                  />
                </InputGroup>
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
                <InputGroup>
                  <InputGroupAddon>
                    <Hash />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="organization-dic"
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="pr.: 1234567890"
                  />
                </InputGroup>
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
                <InputGroup>
                  <InputGroupAddon>
                    <MapPinHouse />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="organization-address"
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="pr.: Hlavná 123"
                    autoComplete="street-address"
                  />
                </InputGroup>
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
                <InputGroup>
                  <InputGroupAddon>
                    <MapPinned />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="organization-city"
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="pr.: Bratislava"
                    autoComplete="address-level2"
                  />
                </InputGroup>
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
                <InputGroup>
                  <InputGroupAddon>
                    <MapPin />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="organization-postal-code"
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="pr.: 12345"
                    autoComplete="postal-code"
                  />
                </InputGroup>
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
                <InputGroup>
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="organization-email"
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="info@example.sk"
                    autoComplete="email"
                  />
                </InputGroup>
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
                <InputGroup>
                  <InputGroupAddon>
                    <Phone />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="organization-telephone"
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="+421 900 123 456"
                    autoComplete="tel"
                  />
                </InputGroup>
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
                <InputGroup>
                  <InputGroupAddon>
                    <Globe />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="organization-website"
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                    placeholder="https://example.sk"
                    autoComplete="url"
                  />
                </InputGroup>
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
