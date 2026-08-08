"use client";

import Link from "next/link";

const KontaktInfo = () => {
  return (
    <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
      <div>
        <h2 className="text-base font-semibold uppercase tracking-tight">
          Prevádzkovateľ
        </h2>
        <p className="text-foreground font-semibold">Márton Ruzsik</p>
        <p>Sídlo: Tvrdošovce 94 110, Slovensko</p>
        <p>
          Web:{" "}
          <Link
            className="hover:underline text-foreground"
            href="https://www.martonruzsik.sk"
          >
            www.martonruzsik.sk
          </Link>
        </p>
      </div>
      <div>
        <h2 className="text-base font-semibold uppercase tracking-tight">
          Napíšte nám
        </h2>
        <p className="mb-4 text-muted-foreground">
          Dotazy, návrhy alebo požiadavky, reklamácie o ochrane osobných údajov:{" "}
          <Link
            className="underline text-primary"
            href="mailto:marton.ruzsik@icloud.com"
          >
            marton.ruzsik@icloud.com.
          </Link>{" "}
          Ozveme sa Vám v čo najkratšom čase.
        </p>
      </div>
      <div>
        <h2 className="text-base font-semibold uppercase tracking-tight">
          Právne dokumenty
        </h2>
        <Link className="underline text-primary" href={"/terms"}>
          Obchodné podmienky
        </Link>{" "}
        ·{" "}
        <Link className="underline text-primary" href={"/privacy"}>
          Ochrana osobných údajov
        </Link>
      </div>
    </div>
  );
};

export default KontaktInfo;
