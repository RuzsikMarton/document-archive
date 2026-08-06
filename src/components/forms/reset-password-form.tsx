"use client";

import { resetPasswordValidationSchema } from "@/utils/validation/auth";
import { resetPasswordAction } from "@/actions/auth/reset-password";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<z.infer<typeof resetPasswordValidationSchema>>({
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
        className="flex flex-col gap-2 w-full mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="input-label" htmlFor="password">
          Nové heslo
        </label>
        <input
          className="input-form"
          type="password"
          id="password"
          placeholder="Vaše nové heslo"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-sm text-destructive">
            {errors.password.message}
          </span>
        )}
        <label className="input-label" htmlFor="confirmPassword">
          Potvrďte nové heslo
        </label>
        <input
          className="input-form"
          type="password"
          id="confirmPassword"
          placeholder="Potvrďte vaše nové heslo"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </span>
        )}
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
