"use client";

import { sendInvitationSchema } from "../../utils/validation/organization";
import { Loader2, Plus } from "lucide-react";
import SearchInput from "../common/search-input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const EmployeesHeader = ({ organizationId }: { organizationId?: string }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<z.infer<typeof sendInvitationSchema>>({
    resolver: zodResolver(sendInvitationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof sendInvitationSchema>> = async (
    data,
  ) => {
    const { error } = await authClient.organization.inviteMember({
      email: data.email,
      role: "member",
      organizationId: organizationId,
    });

    if (error) {
      toast.error(error.message || "Nepodarilo sa pozvať zamestnanca.");
      return;
    }
    toast.success("Pozvánka bola úspešne odoslaná.");
    reset();
  };
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
      <SearchInput />
      <Dialog>
        <DialogTrigger
          render={
            <Button className="h-12">
              Pridať zamestnanca
              {isSubmitting ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="ml-2 h-4 w-4" />
              )}
            </Button>
          }
        />
        <DialogContent>
          <DialogHeader>
            <h3 className="text-lg font-semibold">Pridať zamestnanca</h3>

            <span className="text-muted-foreground">
              Zadajte email zamestnanca, ktorého chcete pozvať.
            </span>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="employee-email">E-mail</FieldLabel>

                  <Input
                    id="employee-email"
                    type="email"
                    placeholder="Zadajte email zamestnanca"
                    {...field}
                    disabled={isSubmitting}
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Odosielanie...
                </>
              ) : (
                <>
                  Pozvať zamestnanca
                  <Plus className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeesHeader;
