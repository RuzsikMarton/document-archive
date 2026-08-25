"use client";

import { signUpSchema } from "@/utils/validation/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signUpAction } from "@/actions/auth/sign-up";
import { SignUpFormValues } from "@/types/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteId = searchParams?.get("inviteId");
  const email = searchParams?.get("email");

  const {
    register,
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
      <div className="flex flex-col items-center w-full bg-card p-6 sm:p-8 rounded-md max-w-md ">
        <h1 className="text-2xl font-bold mb-4 text-center">Registrácia</h1>
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="input-label" htmlFor="name">
            Meno / Názov firmy
          </label>
          <input
            className="input-form "
            type="text"
            id="name"
            {...register("name")}
            placeholder="Meno"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            className="input-form "
            type="email"
            id="email"
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
          <label className="input-label" htmlFor="password">
            Heslo
          </label>
          <input
            className="input-form "
            type="password"
            id="password"
            {...register("password")}
            placeholder="Heslo"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
          <label className="input-label" htmlFor="confirmPassword">
            Potvrdenie hesla
          </label>
          <input
            className="input-form "
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
            placeholder="Potvrdenie hesla"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
          {errors.root && (
            <p className="text-sm text-red-600 mt-1">{errors.root.message}</p>
          )}

          <Button
            className="p-4 mt-4 disabled:cursor-not-allowed"
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
      <div className="text-balance text-xs text-center text-muted-foreground mt-4 max-w-md *:[a]:underline *:[a]:underline-offset-2 *:[a]:hover:text-primary/90">
        Registráciou súhlasíte s{" "}
        <Link href="/terms">Podmienkami používania</Link> a{" "}
        <Link href="/privacy">Zásadami ochrany osobných údajov</Link>
      </div>
    </div>
  );
};

export default SignUpForm;
