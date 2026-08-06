"use client";

import { forgotPasswordSchema } from "@/utils/validation/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof forgotPasswordSchema>> = async (
    data,
  ) => {
    clearErrors("root");
    setIsLoading(true);
    const { error } = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
    });
    setIsLoading(false);
    if (error) {
      toast.error(
        error.message ||
          "Nastala chyba pri odosielaní požiadavky na resetovanie hesla.",
      );
    } else {
      toast.success("Odkaz na resetovanie hesla bol odoslaný na váš email.");
    }
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
        <h1 className="text-2xl font-bold text-foreground">Zabudnuté heslo</h1>
        <span className="text-sm text-muted-foreground">
          Zadajte svoj email, aby ste mohli resetovať heslo.{" "}
        </span>
      </div>
      <form
        className="flex flex-col gap-2 w-full mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          className="input-form"
          type="email"
          id="email"
          placeholder="Váš email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-sm text-destructive">
            {errors.email.message}
          </span>
        )}
        {errors.root && (
          <span className="text-sm text-destructive">
            {errors.root.message}
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
            "Poslať odkaz na resetovanie hesla"
          )}
        </Button>
      </form>
      <div className="text-center text-sm text-muted-foreground mt-4 ">
        Ešte nemáte účet?{" "}
        <a
          href="/signup"
          className="underline underline-offset-4 hover:text-primary/90"
        >
          Zaregistrovať sa
        </a>
      </div>
    </div>
  );
};
export default ForgotPasswordForm;
