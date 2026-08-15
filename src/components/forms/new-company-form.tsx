"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { newCompanySchema } from "@/utils/validation/company";
import z from "zod";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { createCompanyAction } from "@/actions/company/admin-company";
import { toast } from "sonner";

const NewCompanyForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    clearErrors,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(newCompanySchema),
    defaultValues: { name: "", ownerId: "", slug: "" },
  });

  const onSumbit: SubmitHandler<z.infer<typeof newCompanySchema>> = async (
    data,
  ) => {
    clearErrors();
    console.log(data);
    const res = await createCompanyAction(data);
    if (!res.success) {
      toast.error(res.message || "Chyba pri vytváraní spoločnosti.");
      return;
    } else {
      toast.success("Spoločnosť bola úspešne vytvorená.");
      console.log(res.company);
    }
    router.push(`/company/${res.company?.id}`);
  };
  return (
    <>
      {" "}
      <DialogHeader className="mt-2">
        <DialogTitle>Nová firma</DialogTitle>
        <DialogDescription>Vyplňte nasledujúce údaje</DialogDescription>
        <form onSubmit={handleSubmit(onSumbit)} id="new-company-form">
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mt-4">
                  <FieldLabel htmlFor="new-company-form-name">
                    Názov / Firma
                  </FieldLabel>
                  <Input
                    id="new-company-form-name"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Zadajte názov"
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
                <Field data-invalid={fieldState.invalid} className="mt-4">
                  <FieldLabel htmlFor="new-company-form-slug">
                    Slug spoločnosti
                  </FieldLabel>
                  <Input
                    id="new-company-form-slug"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Zadajte slug"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="ownerId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="mt-4">
                  <FieldLabel htmlFor="new-company-form-owner-id">
                    ID vlastníka
                  </FieldLabel>
                  <Input
                    id="new-company-form-owner-id"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Zadajte ID vlastníka"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </DialogHeader>
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Zrušiť</Button>} />
        <Button
          type="submit"
          className="dark:text-black"
          form="new-company-form"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Vytvoriť"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default NewCompanyForm;
