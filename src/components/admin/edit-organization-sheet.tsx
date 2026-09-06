"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { editOrganizationAdminSchema } from "@/utils/validation/organization";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Organization } from "@/generated/prisma/client";
import { Loader2 } from "lucide-react";
import { updateOrganizationAdmin } from "@/actions/admin/organizations";
import { toast } from "sonner";

const EditOrganizationSheet = ({
  open,
  setOpen,
  organization,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  organization: Organization;
}) => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
    control,
  } = useForm<z.infer<typeof editOrganizationAdminSchema>>({
    resolver: zodResolver(editOrganizationAdminSchema),
    defaultValues: {
      name: organization.name,
      slug: organization.slug,
      ico: organization.ico ?? "",
      dic: organization.dic ?? "",
      city: organization.city ?? "",
      address: organization.address ?? "",
      postalCode: organization.postalCode ?? "",
      telephone: organization.telephone ?? "",
      email: organization.email ?? "",
      website: organization.website ?? "",
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof editOrganizationAdminSchema>
  > = async (data) => {
    const res = await updateOrganizationAdmin(organization.id, data);
    if (!res.success) {
      toast.error(res.message);
      return;
    } else {
      toast.success(res.message);
      setOpen(false);
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Upraviť organizáciu</SheetTitle>
          <SheetDescription>
            Tu môžete upraviť informácie o organizácii.
          </SheetDescription>
        </SheetHeader>
        <form id="edit-organization-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="px-2">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Názov organizácie</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Názov organizácie"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="slug"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Slug organizácie</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Slug organizácie"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex gap-2">
              <Controller
                name="ico"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>IČO</FieldLabel>
                    <Input
                      {...field}
                      placeholder="IČO"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="dic"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>DIČ</FieldLabel>
                    <Input
                      {...field}
                      placeholder="DIČ"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Adresa</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Adresa"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex gap-2">
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Mesto</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Mesto"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="postalCode"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>PSČ</FieldLabel>
                    <Input
                      {...field}
                      placeholder="PSČ"
                      autoComplete="postal-code"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="telephone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Telefón</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Telefón"
                    autoComplete="tel"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>E-mail</FieldLabel>
                  <Input
                    {...field}
                    placeholder="E-mail"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="website"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Webová stránka</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Webová stránka"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <SheetFooter className="mt-auto">
            <div className="flex gap-2">
              <Button
                type="submit"
                form="edit-organization-form"
                className="w-1/2"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Uložiť"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                className="w-1/2"
                disabled={isSubmitting}
              >
                Reset
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditOrganizationSheet;
