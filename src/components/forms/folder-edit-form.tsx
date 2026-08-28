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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Download, Loader2, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { EditFolderSchema } from "@/utils/validation/folder";
import { FolderWithOrganization } from "@/types/folder";
import { TransferProtocolDialog } from "./transfer-protocol-form";

import "@/lib/fonts/Roboto-Regular-normal";
import { drawFolderLabel } from "@/utils/pdf/draw-folder-label";
import { drawSmallFolderLabel } from "@/utils/pdf/draw-smallfolder-label";

type EditFolderFormType = z.infer<typeof EditFolderSchema>;

const FolderEditForm = ({ folder }: { folder: FolderWithOrganization }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));

  const {
    handleSubmit,
    control,
    reset,
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
    setIsPending(true);
    const trimmedData = {
      ...data,
      name: data.name.trim(),
      contents: data.contents?.trim(),
    };
    const res = await updateFolderAction(trimmedData, folder.id);
    if (!res.success) {
      toast.error(res.message || "Chyba pri aktualizácii záznamu.");
      setIsPending(false);
      return;
    }
    setIsPending(false);
    setIsEditing(false);
    toast.success("Záznam bol úspešne aktualizovaný.");
    reset(trimmedData); // Reset the form with the updated data
    router.refresh();
  };

  const handleDelete = async () => {
    clearErrors();
    setIsPending(true);
    const res = await deleteFolderAction(folder.id);
    if (!res.success) {
      toast.error(res.message || "Chyba pri mazaní záznamu.");
      setIsPending(false);
      return;
    }
    setIsPending(false);
    toast.success("Záznam bol úspešne zmazaný.");
    router.push("/folders");
  };

  const handleHandedOverChange = async (checked: boolean) => {
    clearErrors();

    const res = await folderHandedOverAction(folder.id, checked);
    if (!res.success) {
      toast.error(res.message || "Chyba pri aktualizácii stavu odovzdania.");
      return;
    }
    if (checked) {
      toast.success("Záznam bol úspešne označený ako odovzdaný.");
    } else {
      toast.success("Záznam bol úspešne označený ako neodovzdaný.");
    }
    router.refresh();
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const handleDownloadQR = () => {
    if (!folder.qrCodeImage) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [70, 170],
    });

    drawFolderLabel(doc, folder, 10, 10);
    doc.save(`qr-${folder.name}-${folder.year}.pdf`);
  };

  const handleDownloadSmallQR = () => {
    if (!folder.qrCodeImage) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [50, 170],
    });

    drawSmallFolderLabel(doc, folder, 10, 10);
    doc.save(`qr-${folder.name}-${folder.year}.pdf`);
  };

  return (
    <div className="space-y-6 p-6 lg:px-16">
      {/* Header with Edit button */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Detaily záznamu
        </h1>

        <div className="text-xs text-muted-foreground">
          ID: <span className="font-mono">{folder.id}</span>
        </div>
      </div>
      {session &&
        session.session.activeOrganizationId === folder.organizationId && (
          <>
            {!isEditing ? (
              <div className="flex flex-wrap justify-end gap-2">
                <>
                  <Button
                    type="button"
                    className="dark:text-black"
                    onClick={() => setIsEditing(true)}
                  >
                    Upraviť
                  </Button>
                </>
                <TransferProtocolDialog folder={folder} />
                <AlertDialog>
                  <AlertDialogTrigger
                    render={<Button variant="destructive">Zmazať</Button>}
                  />
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                      </AlertDialogMedia>
                      <AlertDialogTitle>Zmazať záznam?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Ste si istý, že chcete zmazať tento záznam? Táto akcia
                        je nevratná a všetky údaje budú nenávratne odstránené.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel variant="outline">
                        Zrušiť
                      </AlertDialogCancel>
                      <AlertDialogAction
                        variant="destructive"
                        render={
                          <Button onClick={handleDelete} disabled={isPending}>
                            {isPending ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              "Zmazať"
                            )}
                          </Button>
                        }
                      />
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <div className="flex justify-end gap-2">
                <Button
                  type="submit"
                  className="dark:text-black"
                  form="folder-edit-form"
                  disabled={isPending}
                >
                  {isPending ? <Loader2 className="animate-spin" /> : "Uložiť"}
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Zrušiť
                </Button>
              </div>
            )}
          </>
        )}
      <form id="folder-edit-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
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
                      className="disabled:opacity-100 disabled:cursor-default"
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
                          <ComboboxEmpty>Žiadne výsledky</ComboboxEmpty>
                          <ComboboxList>
                            {(year) => (
                              <ComboboxItem key={year} value={year}>
                                {year}
                              </ComboboxItem>
                            )}
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
                            field.onChange(
                              value === "" ? undefined : Number(value),
                            )
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
                            <ComboboxEmpty>Žiadne výsledky</ComboboxEmpty>
                            <ComboboxList>
                              {(month) => (
                                <ComboboxItem key={month} value={month}>
                                  {month}
                                </ComboboxItem>
                              )}
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
                            field.onChange(
                              value === "" ? undefined : Number(value),
                            )
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
                            <ComboboxEmpty>Žiadne výsledky</ComboboxEmpty>
                            <ComboboxList>
                              {(month) => (
                                <ComboboxItem key={month} value={month}>
                                  {month}
                                </ComboboxItem>
                              )}
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
                  disabled={
                    folder.handedOver ||
                    !session ||
                    session.session.activeOrganizationId !==
                      folder.organizationId
                  }
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
                  {session &&
                    session.session.activeOrganizationId ===
                      folder.organizationId && (
                      <div className="flex w-full flex-col gap-2 sm:flex-row">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-2/4"
                          onClick={handleDownloadQR}
                        >
                          <Download />
                          Štítok 5 × 15 cm
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-2/4"
                          onClick={handleDownloadSmallQR}
                        >
                          <Download />
                          Štítok 3 × 15 cm
                        </Button>
                      </div>
                    )}
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
                <FieldDescription>
                  Obsah záznamu je voliteľný a slúži na lepšiu identifikáciu
                  dokumentov.
                </FieldDescription>
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
                <FieldDescription>
                  Pre správne zobrazenie v protokole odporúčame maximálne 70
                  znakov na jeden riadok.
                </FieldDescription>
              </Field>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default FolderEditForm;
