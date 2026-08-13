"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { FolderWithCompany } from "@/types/folder";
import { generateTransferProtocol } from "@/utils/pdf/preberaci-protokol";
import { FileDown } from "lucide-react";
import { TransferProtocolSchema } from "@/utils/validation/folder";

type TransferProtocolForm = z.infer<typeof TransferProtocolSchema>;

interface TransferProtocolDialogProps {
  folder: FolderWithCompany;
}

export function TransferProtocolDialog({
  folder,
}: TransferProtocolDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<TransferProtocolForm>({
    resolver: zodResolver(TransferProtocolSchema),
    defaultValues: {
      address: "",
      ico: "",
      dic: "",
    },
  });

  const onSubmit = (data: TransferProtocolForm) => {
    generateTransferProtocol({
      folder,
      address: data.address,
      ico: data.ico,
      dic: data.dic,
    });

    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" variant="outline" />}>
        <FileDown />{" "}
        <span className="hidden sm:block ml-2">Preberací protokol</span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Protokol o odovzdaní</DialogTitle>

          <DialogDescription>
            Pre správnosť údajov o preberajúcej (prijímajúcej) firme v dokladoch
            je potrebné vyplniť sídlo, IČO a DIČ. Tieto údaje sa následne
            zobrazia v preberacom protokole.
          </DialogDescription>
        </DialogHeader>

        <form
          id="transfer-protocol-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Field>
              <FieldLabel>Sídlo</FieldLabel>

              <Input
                {...form.register("address")}
                placeholder="Sídlo preberajúcej firmy"
              />

              {form.formState.errors.address && (
                <FieldError errors={[form.formState.errors.address]} />
              )}
            </Field>

            <Field>
              <FieldLabel>IČO (voliteľné)</FieldLabel>

              <Input {...form.register("ico")} placeholder="IČO" />

              {form.formState.errors.ico && (
                <FieldError errors={[form.formState.errors.ico]} />
              )}
            </Field>

            <Field>
              <FieldLabel>DIČ (voliteľné)</FieldLabel>

              <Input {...form.register("dic")} placeholder="DIČ" />
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Zrušiť
          </Button>

          <Button type="submit" form="transfer-protocol-form">
            Stiahnuť protokol
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
