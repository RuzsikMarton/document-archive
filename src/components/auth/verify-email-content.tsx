"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

type VerificationState = "loading" | "success" | "error" | "no-token";

const VerifyEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<VerificationState>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setState("no-token");
        setMessage("Neplatný overovací odkaz. Token nebol nájdený.");
        return;
      }

      try {
        // Using better-auth client to verify email
        const result = await authClient.verifyEmail({
          query: {
            token,
          },
        });

        if (result.error) {
          setState("error");
          setMessage(
            result.error.message ||
              "Overenie e-mailu zlyhalo. Token môže byť neplatný alebo vypršal.",
          );
        } else {
          setState("success");
          setMessage("Váš e-mail bol úspešne overený!");
        }
      } catch (error) {
        setState("error");
        setMessage("Niečo sa pokazilo. Skúste to prosím znova.");
        console.error("Email verification error:", error);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center w-full rounded-md bg-card p-6 sm:p-8 max-w-md">
      <img
        src={"/logo-dark-2.webp"}
        alt="Evidio Logo"
        className="w-44 h-auto hidden dark:block mb-6"
        loading="lazy"
        decoding="async"
      />
      <img
        src={"/logo-2.webp"}
        alt="Evidio Logo"
        className="w-44 h-auto block dark:hidden mb-6"
        loading="lazy"
        decoding="async"
      />

      <div className="flex flex-col items-center gap-4 w-full text-center">
        {state === "loading" && (
          <>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-semibold">Overovanie e-mailu...</h1>
            <p className="text-muted-foreground">
              Prosím počkajte, kým overíme váš e-mail.
            </p>
          </>
        )}

        {state === "success" && (
          <>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-500" />
            </div>
            <h1 className="text-2xl font-semibold text-green-600 dark:text-green-500">
              Úspech!
            </h1>
            <p className="text-foreground">{message}</p>
            <p className="text-sm text-muted-foreground">
              Budete presmerovaní...
            </p>
            <Link href="/" className="mt-4">
              <Button>Pokračovať</Button>
            </Link>
          </>
        )}

        {(state === "error" || state === "no-token") && (
          <>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold text-red-600 dark:text-red-500">
              Overenie zlyhalo
            </h1>
            <p className="text-foreground">{message}</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
              <Link href="/signup" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Znova sa zaregistrovať
                </Button>
              </Link>
              <Link href="/signin" className="flex-1">
                <Button className="w-full">Prihlásiť sa</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailContent;
