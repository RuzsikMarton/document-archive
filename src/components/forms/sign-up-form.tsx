"use client";

import { signUpSchema } from "@/utils/validation/auth";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUpAction } from "@/actions/auth/sign-up";
import { SignUpFormValues } from "@/types/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { useState } from "react";

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteId = searchParams?.get("inviteId");
  const email = searchParams?.get("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);
  const [isConfirmPasswordTyping, setIsConfirmPasswordTyping] = useState(false);

  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    clearErrors("root");
    const res = await signUpAction(data);
    if (!res.success) {
      setError("root", { message: res.message });
      return;
    }
    if (inviteId) {
      router.push(`/organization/invitation/${inviteId}`);
    } else {
      router.push("/");
      router.refresh();
    }
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
          className="flex flex-col gap-4 w-full mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Meno / Názov firmy</FieldLabel>
                <InputGroup
                  className={`h-10 bg-accent rounded-sm border-primary/25 dark:border-muted-foreground/75 ${!!errors.name ? "border-destructive ring-2 ring-destructive/20 dark:ring-destructive/30" : "focus-within:ring-1 focus-within:ring-primary/75"}`}
                >
                  <InputGroupAddon align="inline-start">
                    <User className="size-4" />
                  </InputGroupAddon>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    placeholder="Meno"
                    aria-invalid={!!errors.name}
                    className="border-0 bg-transparent! focus-visible:outline-none focus-visible:ring-0"
                  />
                </InputGroup>
                <FieldError>{errors.name?.message}</FieldError>
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <InputGroup
                  className={`h-10 bg-accent rounded-sm border-primary/25 dark:border-muted-foreground/75 ${!!errors.email ? "border-destructive ring-2 ring-destructive/20 dark:ring-destructive/30" : "focus-within:ring-1 focus-within:ring-primary/75"}`}
                >
                  <InputGroupAddon align="inline-start">
                    <Mail className="size-4" />
                  </InputGroupAddon>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="email@domena.sk"
                    aria-invalid={!!errors.email}
                    className="border-0 bg-transparent! focus-visible:outline-none focus-visible:ring-0"
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
                  className={`h-10 bg-accent rounded-sm border-primary/25 dark:border-muted-foreground/75 ${!!errors.password ? "border-destructive ring-2 ring-destructive/20 dark:ring-destructive/30" : "focus-within:ring-1 focus-within:ring-primary/75"}`}
                >
                  <InputGroupAddon align="inline-start">
                    <Lock className="size-4" />
                  </InputGroupAddon>
                  <Input
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    aria-invalid={!!errors.password}
                    onChange={(e) => {
                      field.onChange(e);
                      setIsPasswordTyping(e.target.value.length > 0);
                    }}
                    className="border-0 bg-transparent! focus-visible:outline-none focus-visible:ring-0"
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

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel htmlFor="confirmPassword">
                  Potvrdenie hesla
                </FieldLabel>
                <InputGroup
                  className={`h-10 bg-accent rounded-sm border-primary/25 dark:border-muted-foreground/75 ${!!errors.confirmPassword ? "border-destructive ring-2 ring-destructive/20 dark:ring-destructive/30" : "focus-within:ring-1 focus-within:ring-primary/75"}`}
                >
                  <InputGroupAddon align="inline-start">
                    <Lock className="size-4" />
                  </InputGroupAddon>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    aria-invalid={!!errors.confirmPassword}
                    onChange={(e) => {
                      field.onChange(e);
                      setIsConfirmPasswordTyping(e.target.value.length > 0);
                    }}
                    className="border-0 bg-transparent! focus-visible:outline-none focus-visible:ring-0"
                  />
                  {isConfirmPasswordTyping && (
                    <InputGroupAddon align="inline-end">
                      <button
                        className="text-muted-foreground hover:text-foreground/75 mr-1"
                        type="button"
                        aria-label={
                          showConfirmPassword ? "Skryť heslo" : "Zobraziť heslo"
                        }
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </InputGroupAddon>
                  )}
                </InputGroup>
                <FieldError>{errors.confirmPassword?.message}</FieldError>
              </Field>
            )}
          />

          {errors.root && <FieldError>{errors.root.message}</FieldError>}

          <Button
            className="mt-2 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              "Registrovať sa"
            )}
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground mt-4">
          Už máte účet?{" "}
          <Link
            href={
              inviteId && email
                ? `/signin?inviteId=${inviteId}&email=${email}`
                : "/signin"
            }
            className="hover:underline underline-offset-4 text-primary"
          >
            Prihlásiť sa
          </Link>
        </div>
      </div>
      <div className="text-balance text-xs text-center text-muted-foreground mt-4 max-w-md hover:text-black/80 dark:hover:text-white">
        Registráciou súhlasíte s{" "}
        <Link
          href="/terms"
          className="underline underline-offset-2 hover:text-primary/90"
        >
          Podmienkami používania
        </Link>{" "}
        a{" "}
        <Link
          href="/privacy"
          className="underline underline-offset-2 hover:text-primary/90"
        >
          Zásadami ochrany osobných údajov
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
