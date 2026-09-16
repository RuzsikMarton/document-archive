"use client";

import { SignInFormValues } from "@/types/auth";
import { signInSchema } from "@/utils/validation/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";
import { signInAction } from "@/actions/auth/sign-in";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { useState } from "react";

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteId = searchParams?.get("inviteId");
  const email = searchParams?.get("email");
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const redirect = searchParams.get("redirect");

  function getSafeRedirect(redirect: string | null) {
    if (!redirect) return null;

    if (!redirect.startsWith("/") || redirect.startsWith("//")) {
      return null;
    }

    return redirect;
  }

  const params = new URLSearchParams();

  if (inviteId) params.set("inviteId", inviteId);
  if (email) params.set("email", email);
  const safeRedirect = getSafeRedirect(redirect);
  if (safeRedirect) params.set("redirect", safeRedirect);

  const signUpUrl = params.toString()
    ? `/signup?${params.toString()}`
    : "/signup";

  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: email || "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    clearErrors("root");
    const res = await signInAction(data);
    if (!res.success) {
      setError("root", { message: res.message });
      return;
    }

    const destination = inviteId
      ? `/invitation/${inviteId}`
      : safeRedirect || "/dashboard";

    router.push(destination);
    router.refresh();
  };
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-full md:min-w-sm rounded-md bg-card p-6 sm:p-8 max-w-md shadow-md">
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
          className="flex flex-col gap-4 w-full mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup
                  className={`h-10 bg-accent rounded-sm border-primary/25 dark:border-muted-foreground/75 ${!!errors.email ? "border-destructive! ring-2 ring-destructive/20 dark:ring-destructive/30" : "focus-within:ring-1 focus-within:ring-primary/75"}`}
                >
                  <InputGroupAddon align="inline-start">
                    <Mail className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id="email"
                    type="email"
                    placeholder="email@domena.sk"
                    autoComplete="email"
                  />
                </InputGroup>
                <FieldError>{errors.email?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Heslo</FieldLabel>
                <InputGroup
                  className={`h-10 bg-accent rounded-sm border-primary/25 dark:border-muted-foreground/75 ${!!errors.password ? "border-destructive! ring-2 ring-destructive/20 dark:ring-destructive/30" : "focus-within:ring-1 focus-within:ring-primary/75"}`}
                >
                  <InputGroupAddon align="inline-start">
                    <Lock className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    autoComplete="current-password"
                    onChange={(e) => {
                      field.onChange(e);
                      setIsPasswordTyping(e.target.value.length > 0);
                    }}
                  />
                  {isPasswordTyping && (
                    <InputGroupAddon align="inline-end">
                      <button
                        className="text-muted-foreground hover:text-foreground/75 mr-1"
                        type="button"
                        aria-label={
                          showPassword ? "Skryť heslo" : "Zobraziť heslo"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </InputGroupAddon>
                  )}
                </InputGroup>
                <FieldError>{errors.password?.message}</FieldError>
              </Field>
            )}
          />

          {errors.root && <FieldError>{errors.root.message}</FieldError>}

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
            href={signUpUrl}
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
