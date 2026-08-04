"use client";

import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="mx-auto">
      <div className="p-16 bg-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center md:items-start md:justify-items-center">
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
            <p className="mb-4">
              Evidio – Jednoduchá a prehľadná aplikácia na evidenciu šanónov
              prostredníctvom QR kódov.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={"https://www.martonruzsik.sk/sk"}
                className="flex items-center justify-center text-primary border-primary p-3 border rounded-full hover:bg-primary hover:text-background transition-colors duration-300"
              >
                <FaGlobe className="text-lg" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/RuzsikMarton"
                className="flex items-center justify-center text-primary border-primary p-3 border rounded-full hover:bg-primary hover:text-background transition-colors duration-300"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/m%C3%A1rton-ruzsik-47561b313/"
                className="flex items-center justify-center text-primary border-primary p-3 border rounded-full hover:bg-primary hover:text-background transition-colors duration-300"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start justify-items-start gap-2">
            <h2 className="uppercase text-xl font-semibold">Centrum pomoci</h2>
            <Link href="/help" className="hover:underline ">
              Ako používať Evidio
            </Link>
            <Link href="/terms" className="hover:underline ">
              Podmienky používania
            </Link>
            <Link href="/privacy" className="hover:underline ">
              Ochrana osobných údajov
            </Link>
          </div>
          <div className="flex flex-col items-start justify-items-start gap-2">
            <h2 className="uppercase text-xl font-semibold">Kontakt</h2>
            <p className="">E-mail:</p>
            <a
              href="mailto:imarton.ruzsik@icloud.com"
              className="hover:underline"
            >
              marton.ruzsik@icloud.com
            </a>

            <p className="">Webstránka:</p>
            <a
              href="https://www.martonruzsik.sk/sk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              www.martonruzsik.sk
            </a>
          </div>
        </div>
      </div>
      <div className="bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-border py-8 text-center text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row justify-between">
              <p className="text-center text-sm">
                &copy; {new Date().getFullYear()} Evidio. All rights reserved.
              </p>

              <p className="text-center text-sm">Made by Márton Ruzsik</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
