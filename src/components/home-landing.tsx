import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomeLanding = () => {
  return (
    <div className="max-w-2xl w-full text-center space-y-8">
      {/* Logo */}
      <div className="flex justify-center">
        <img
          src="/logo-dark-2.webp"
          alt="Evidio"
          width={200}
          height={200}
          className="hidden dark:block"
          loading="eager"
        />
        <img
          src="/logo-2.webp"
          alt="Evidio"
          width={200}
          height={200}
          className="block dark:hidden"
          loading="eager"
        />
      </div>

      {/* Tagline */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          Evidencia dokumentov
        </h1>
        <p className="text-lg text-muted-foreground">
          Bezpečný systém na správu a archiváciu dokumentov pre vašu spoločnosť
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link href="/signin">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Prihlásiť sa
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="lg" className="w-full sm:w-auto">
            Registrovať sa
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeLanding;
