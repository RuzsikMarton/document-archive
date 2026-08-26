"use client";

import { resetPasswordValidationSchema } from "@/utils/validation/auth";
import { resetPasswordAction } from "@/actions/auth/reset-password";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import { Input } from "../ui/input";

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);
  const [isConfirmPasswordTyping, setIsConfirmPasswordTyping] = useState(false);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<z.infer<typeof resetPasswordValidationSchema>>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordValidationSchema),
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof resetPasswordValidationSchema>
  > = async (data) => {
    clearErrors();
    setIsLoading(true);
    const res = await resetPasswordAction(searchParams.get("token")!, data);
    if (!res?.success) {
      toast.error(res?.message || "Nastala chyba. Skúste to znova.");
      setIsLoading(false);
      return;
    } else {
      toast.success("Heslo bolo úspešne zmenené.");
      router.push("/signin");
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col items-center w-full rounded-md bg-card p-6 sm:p-8 max-w-md">
      <img
        src={"/logo-dark-2.webp"}
        alt="Evidio Logo"
        className="w-44 h-auto hidden dark:block"
        loading="lazy"
        decoding="async"
      />
      <img
        src={"/logo-2.webp"}
        alt="Evidio Logo"
        className="w-44 h-auto block dark:hidden"
        loading="lazy"
        decoding="async"
      />
      <div className="text-center mt-2">
        <h1 className="text-2xl font-bold text-foreground">
          Resetovanie hesla
        </h1>
        <span className="text-sm text-muted-foreground">
          Zadajte nové heslo.{" "}
        </span>
      </div>
      <form
        className="flex flex-col gap-6 w-full mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="password">Nové heslo</FieldLabel>
              <InputGroup
                className={`h-10 bg-accent rounded-sm border-primary/25 dark:border-muted-foreground/75 ${!!errors.password ? "border-destructive! ring-2 ring-destructive/20 dark:ring-destructive/30" : "focus-within:ring-1 focus-within:ring-primary/75"}`}
              >
                <Input
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Vaše nové heslo"
                  onChange={(e) => {
                    field.onChange(e);
                    setIsPasswordTyping(e.target.value.length > 0);
                  }}
                  className="border-0 bg-transparent! focus-visible:outline-none focus-visible:ring-0"
                />
                <InputGroupAddon align="inline-end">
                  {isPasswordTyping && (
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Skryť heslo" : "Zobraziť heslo"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground/75 mr-1"
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  )}
                </InputGroupAddon>
              </InputGroup>
              <FieldError>{errors.password?.message}</FieldError>
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <Field data-invalid={!!errors.confirmPassword}>
              <FieldLabel htmlFor="confirmPassword">
                Potvrďte nové heslo
              </FieldLabel>
              <InputGroup
                className={`h-10 bg-accent rounded-sm border-primary/25 dark:border-muted-foreground/75 ${!!errors.password ? "border-destructive! ring-2 ring-destructive/20 dark:ring-destructive/30" : "focus-within:ring-1 focus-within:ring-primary/75"}`}
              >
                <Input
                  {...field}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Potvrďte vaše nové heslo"
                  onChange={(e) => {
                    field.onChange(e);
                    setIsConfirmPasswordTyping(e.target.value.length > 0);
                  }}
                  className="border-0 bg-transparent! focus-visible:outline-none focus-visible:ring-0"
                />
                <InputGroupAddon align="inline-end">
                  {isConfirmPasswordTyping && (
                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword ? "Skryť heslo" : "Zobraziť heslo"
                      }
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-muted-foreground hover:text-foreground/75 mr-1"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  )}
                </InputGroupAddon>
              </InputGroup>
              <FieldError>{errors.confirmPassword?.message}</FieldError>
            </Field>
          )}
        />
        {errors.root && <FieldError>{errors.root.message}</FieldError>}
        <Button
          className="p-4 mt-4 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            "Resetovať heslo"
          )}
        </Button>
      </form>
    </div>
  );
};
export default ResetPasswordForm;
