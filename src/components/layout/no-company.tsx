"use client";
import { Building2, AlertCircle, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NoCompany = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-6">
      <div className="max-w-2xl w-full">
        <div className="rounded-xl border border-border bg-card p-8 md:p-12 shadow-sm">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
              <div className="relative flex items-center justify-center size-20 rounded-full bg-primary/10 border border-primary/20">
                <Building2 className="size-10 text-primary" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-3 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Vitajte v Evidio!
            </h1>
            <p className="text-lg text-muted-foreground">
              Váš účet je aktívny, ale ešte nie ste súčasťou žiadnej spoločnosti
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-4 mb-8">
            <div className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border/50">
              <div className="shrink-0 mt-0.5">
                <AlertCircle className="size-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">
                  Prečo potrebujete spoločnosť?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Na používanie systému evidencie dokumentov musíte byť súčasťou
                  spoločnosti. Spoločnosť vám umožní spravovať a archivovať
                  dokumenty vo vašej organizácii.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border/50">
              <div className="shrink-0 mt-0.5">
                <Users className="size-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">Čo môžete urobiť?</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5 mt-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="size-4 mt-0.5 shrink-0 text-primary" />
                    <span>
                      Kontaktujte administrátora vašej spoločnosti, aby vás
                      pridal do systému
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="size-4 mt-0.5 shrink-0 text-primary" />
                    <span>
                      Ak ste vlastník spoločnosti, požiadajte o vytvorenie novej
                      spoločnosti
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-6 text-center space-y-4">
            <p className="text-sm font-medium">
              Potrebujete pomoc alebo chcete vytvoriť novú spoločnosť?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/help?topic=getting-started">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Prejsť na nápovedu
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button size="lg" className="w-full sm:w-auto">
                  Kontaktovať podporu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoCompany;
