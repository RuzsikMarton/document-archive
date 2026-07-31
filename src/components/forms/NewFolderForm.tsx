"use client";
import { useNewFolderDialog } from "@/providers/new-folder-dialog-provider";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
} from "../ui/combobox";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreateFolderSchema } from "@/utils/validation/folder";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateFolderFormType } from "@/types/folder";
import { createFolder } from "@/actions/folder/new-folder";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const NewFolderForm = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i));
  const { closeDialog } = useNewFolderDialog();

  const {
    handleSubmit,
    control,
    clearErrors,
    setError,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(CreateFolderSchema),
    defaultValues: {
      name: "",
      year: currentYear,
    },
  });

  const onSubmit: SubmitHandler<CreateFolderFormType> = async (data) => {
    clearErrors();
    const res = await createFolder(data);
    if (!res.success) {
      setError("root", { type: "manual", message: res.message });
      return;
    }
    toast.success("Šanón bol úspešne vytvorený.");
    closeDialog();
    router.push(`/folders/${res.id}`);
  };

  return (
    <>
      <DialogHeader className="mt-2">
        <DialogTitle>Nový záznam</DialogTitle>
        <DialogDescription>Vyplňte nasledujúce údaje</DialogDescription>
      </DialogHeader>
      <form id="new-folder-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="mt-4">
                <FieldLabel htmlFor="new-folder-form-name">
                  Názov / Firma
                </FieldLabel>
                <Input
                  id="new-folder-form-name"
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
            name="year"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="mt-4">
                <FieldLabel htmlFor="new-folder-form-year">Rok</FieldLabel>
                <Combobox
                  items={years}
                  value={String(field.value)}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <ComboboxInput
                    id="new-folder-form-year"
                    placeholder="Zadajte rok"
                    showClear={true}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <ComboboxContent>
                    <ComboboxEmpty>Žiadne výsledky</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Zrušiť</Button>} />
        <Button
          type="submit"
          className="dark:text-black"
          form="new-folder-form"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Vytvoriť"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default NewFolderForm;
