"use client";

import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  deleteFolderAction,
  folderHandedOverAction,
  updateFolderAction,
} from "@/actions/folder/folder";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
} from "../ui/combobox";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { EditFolderSchema } from "@/utils/validation/folder";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Folder } from "@/generated/prisma/browser";

type EditFolderFormType = z.infer<typeof EditFolderSchema>;

const FolderEditForm = ({ folder }: { folder: Folder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));

  const {
    handleSubmit,
    control,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<EditFolderFormType>({
    resolver: zodResolver(EditFolderSchema),
    defaultValues: {
      name: folder.name,
      year: folder.year,
      monthFrom: folder.monthFrom ?? undefined,
      monthTo: folder.monthTo ?? undefined,
      contents: folder.contents || "",
    },
  });

  const onSubmit: SubmitHandler<EditFolderFormType> = async (data) => {
    clearErrors();
    setIsEditing(false);

    const res = await updateFolderAction(data, folder.id);
    if (!res.success) {
      setError("root", { type: "manual", message: res.message });
      return;
    }
    reset(data); // Reset the form with the updated data
  };

  const handleDelete = async () => {
    clearErrors();
    const res = await deleteFolderAction(folder.id);
    if (!res.success) {
      setError("root", { type: "manual", message: res.message });
      return;
    }
    router.push("/");
  };

  const handleHandedOverChange = async (checked: boolean) => {
    clearErrors();
    if (checked) {
      const res = await folderHandedOverAction(folder.id);
      if (!res.success) {
        setError("root", { type: "manual", message: res.message });
        return;
      }
      router.refresh(); // Refresh the page to reflect the change
    } else {
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleDownloadQR = () => {
    if (folder.qrCodeImage) {
      const link = document.createElement("a");
      link.href = folder.qrCodeImage;
      link.download = `qr-${folder.name}-${folder.year}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6 p-6 lg:px-16">
      {/* Header with Edit button */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold">Detaily záznamu</span>
          <span className="text-2xl font-base hidden md:inline">
            : {folder.id}
          </span>
        </div>
      </div>
      {session && session.user?.id === folder.userId && (
        <>
          {!isEditing ? (
            <div className="flex justify-between items-center">
              <div>
                {/*<span></span>
                <Button>Generovať transfer kód</Button>*/}
              </div>
              <div className="flex gap-2">
                <Button className="hidden"></Button>
                <Button onClick={() => setIsEditing(true)}>Upraviť</Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Zmazať
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end gap-2">
              <Button type="submit" form="folder-edit-form">
                Uložiť
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Zrušiť
              </Button>
            </div>
          )}
        </>
      )}
      <form id="folder-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form Fields */}
          <div className="space-y-4">
            <FieldGroup>
              {/* Name Input */}
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="folder-edit-name">
                      Názov / Firma
                    </FieldLabel>
                    <Input
                      id="folder-edit-name"
                      {...field}
                      disabled={!isEditing}
                      aria-invalid={fieldState.invalid}
                      placeholder="Zadajte názov"
                      className="disabled:opacity-50 disabled:cursor-default"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Year Combobox */}
              <Controller
                name="year"
                control={control}
                render={({ field, fieldState }) => (
                  <Field className="mt-4" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="folder-edit-year">Rok</FieldLabel>
                    <div className="[&_.group\/input-group]:has-disabled:opacity-100">
                      <Combobox
                        items={years}
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(Number(value))}
                        disabled={!isEditing}
                      >
                        <ComboboxInput
                          id="folder-edit-year"
                          placeholder="Zadajte rok"
                          showClear={true}
                          aria-invalid={fieldState.invalid}
                          disabled={!isEditing}
                          className="disabled:cursor-default"
                        />
                        <ComboboxContent>
                          <ComboboxList>
                            <ComboboxEmpty>Žiadne výsledky</ComboboxEmpty>
                            {years.map((year) => (
                              <ComboboxItem key={year} value={year}>
                                {year}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Month Range - From */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Controller
                  name="monthFrom"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="folder-edit-month-from">
                        Mesiac od (voliteľné)
                      </FieldLabel>
                      <div className="[&_.group\/input-group]:has-disabled:opacity-100">
                        <Combobox
                          items={months}
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(value) =>
                            field.onChange(value ? Number(value) : undefined)
                          }
                          disabled={!isEditing}
                        >
                          <ComboboxInput
                            id="folder-edit-month-from"
                            placeholder="Od"
                            showClear={true}
                            disabled={!isEditing}
                            aria-invalid={fieldState.invalid}
                            className="disabled:cursor-default"
                          />
                          <ComboboxContent>
                            <ComboboxList>
                              <ComboboxEmpty>Žiadne výsledky</ComboboxEmpty>
                              {months.map((month) => (
                                <ComboboxItem key={month} value={month}>
                                  {month}
                                </ComboboxItem>
                              ))}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Month Range - To */}
                <Controller
                  name="monthTo"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="folder-edit-month-to">
                        Mesiac do (voliteľné)
                      </FieldLabel>
                      <div className="[&_.group\/input-group]:has-disabled:opacity-100">
                        <Combobox
                          items={months}
                          value={field.value ? String(field.value) : ""}
                          onValueChange={(value) =>
                            field.onChange(value ? Number(value) : undefined)
                          }
                          disabled={!isEditing}
                        >
                          <ComboboxInput
                            id="folder-edit-month-to"
                            placeholder="Do"
                            showClear={true}
                            disabled={!isEditing}
                            className="disabled:cursor-default"
                          />
                          <ComboboxContent>
                            <ComboboxList>
                              <ComboboxEmpty>Žiadne výsledky</ComboboxEmpty>
                              {months.map((month) => (
                                <ComboboxItem key={month} value={month}>
                                  {month}
                                </ComboboxItem>
                              ))}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              {errors.root && (
                <p className="text-destructive font-semibold">
                  {errors.root.message}
                </p>
              )}

              {/* Handed Over Toggle - Not part of form */}
              <div className="flex items-center justify-between mt-6 p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <FieldLabel>Odovzdané</FieldLabel>
                  {!folder.handedOver ? (
                    <p className="text-sm text-muted-foreground">
                      Označte, ak bolo odovzdané
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {/*Tento záznam bol odovzdaný a už nie je možné ho upravovať."*/}
                      {folder.handedOverAt?.toLocaleDateString("sk-SK", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </p>
                  )}
                </div>
                <Switch
                  checked={folder.handedOver}
                  onCheckedChange={handleHandedOverChange}
                  disabled={folder.handedOver}
                />
              </div>
            </FieldGroup>
          </div>

          {/* Right Column - QR Code */}
          <div className="flex flex-col items-center justify-start space-y-4">
            <div className="w-full max-w-sm">
              {folder.qrCodeImage ? (
                <div className="space-y-4">
                  <div className="relative aspect-square w-full border rounded-lg overflow-hidden bg-white">
                    <Image
                      src={folder.qrCodeImage}
                      alt={`QR kód pre ${folder.name}`}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleDownloadQR}
                  >
                    Stiahnuť QR kód
                  </Button>
                </div>
              ) : (
                <div className="aspect-square w-full border rounded-lg flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground">
                    QR kód nie je dostupný
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contents Textarea - Full width below the grid */}
        <div className="mt-8">
          <Controller
            name="contents"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="folder-edit-contents">Obsah</FieldLabel>
                <Textarea
                  id="folder-edit-contents"
                  {...field}
                  disabled={!isEditing}
                  aria-invalid={fieldState.invalid}
                  placeholder="Zadajte obsah záznamu..."
                  rows={12}
                  className="resize-none disabled:opacity-100 disabled:cursor-default"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default FolderEditForm;
