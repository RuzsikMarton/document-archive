"use client";

import { SignInFormValues } from "@/types/auth";
import { signInSchema } from "@/utils/validation/auth";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { signInAction } from "@/actions/auth/sign-in";
import Link from "next/link";

const SignInForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) });

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    clearErrors("root");
    const res = await signInAction(data);
    if (!res.success) {
      setError("root", { message: res.message });
      return;
    }
    router.push("/");
    router.refresh();
  };
  return (
    <div className="flex flex-col items-center w-full">
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

          <label className="input-label" htmlFor="password">
            Heslo
          </label>
          <input
            className="input-form"
            type="password"
            id="password"
            placeholder="Vaše heslo"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-sm text-destructive">
              {errors.password.message}
            </span>
          )}
          {errors.root && (
            <span className="text-sm text-destructive">
              {errors.root.message}
            </span>
          )}
          <div className="flex justify-end items-center text-xs text-muted-foreground hover:text-primary/90">
            <a href="/forgot-password" className="">
              Zabudli ste heslo?{" "}
            </a>
          </div>
          <Button
            className="mt-2 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              "Prihlásiť sa"
            )}
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground mt-4 ">
          Ešte nemáte účet?{" "}
          <a
            href="/signup"
            className="hover:underline underline-offset-4 text-primary"
          >
            Zaregistrovať sa
          </a>
        </div>
      </div>
      <div className="text-balance text-xs text-center text-muted-foreground mt-4 max-w-md hover:text-black/80 dark:hover:text-white">
        <Link href="/">← späť na hlavnú stránku</Link>
      </div>
    </div>
  );
};
export default SignInForm;
