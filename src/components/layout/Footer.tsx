"use client";

import Link from "next/link";
const Footer = () => {
  return (
    <footer className="mx-auto">
      <div className="p-6 sm:p-12 bg-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-center md:items-start md:justify-items-center">
          <div className="flex flex-col">
            <img
              src={"/logo-dark-2.webp"}
              alt="Evidio Logo"
              className="w-32 h-auto hidden dark:block"
              loading="lazy"
              decoding="async"
            />
            <img
              src={"/logo-2.webp"}
              alt="Evidio Logo"
              className="w-32 h-auto block dark:hidden"
              loading="lazy"
              decoding="async"
            />
            <p className="mb-4 text-muted-foreground">
              Evidio – Jednoduchá a prehľadná aplikácia na evidenciu šanónov
              prostredníctvom QR kódov.
            </p>
          </div>
          <div className="flex flex-col items-start justify-items-start gap-2 text-muted-foreground">
            <h2 className="uppercase text-sm tracking-wider font-semibold">
              Evidio
            </h2>
            <Link href="/" className="hover:underline ">
              Domov
            </Link>
            <Link href="/about" className="hover:underline ">
              O aplikácii
            </Link>
            <Link
              href="/help?topic=getting-started"
              className="hover:underline "
            >
              Začíname
            </Link>
            <Link href="/help?topic=help" className="hover:underline ">
              Pomocník
            </Link>
          </div>
          <div className="flex flex-col items-start justify-items-start gap-2 text-muted-foreground text-sm">
            <h2 className="uppercase tracking-wider font-semibold">Kontakt</h2>
            <Link href="/kontakt" className="hover:underline ">
              Kontakt
            </Link>
            <Link
              href="https://www.martonruzsik.sk/sk"
              className="hover:underline "
              target="_blank"
              rel="noopener noreferrer"
            >
              Kto som
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-muted-foreground/50 py-4 text-center text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row justify-between text-xs text-center gap-2">
              <p>
                &copy; {new Date().getFullYear()} Evidio - Márton Ruzsik. All
                rights reserved.
              </p>
              <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center">
                <Link href="/terms" className="hover:underline ">
                  Podmienky používania
                </Link>
                <Link href="/privacy" className="hover:underline ">
                  Ochrana osobných údajov
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
