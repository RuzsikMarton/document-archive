import { Separator } from "@base-ui/react";
import Link from "next/link";

const GettingStarted = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Začíname</h1>

      <Separator />

      <div className="space-y-8">
        {/* Registration Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Registrácia</h2>
          <p className="text-muted-foreground leading-relaxed">
            Aby ste mohli začať používať náš systém archívu dokumentov, musíte
            si vytvoriť účet. Registračný proces je jednoduchý a priamočiary -
            stačí zadať svoju emailovú adresu a vytvoriť si bezpečné heslo. Po
            registrácii dostanete overovací email na potvrdenie vášho účtu.
          </p>
        </section>

        {/* Company Requirement Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. Vyžadované pripojenie k spoločnosti
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Aby ste mohli vytvárať a spravovať priečinky, musíte byť súčasťou
            organizácie spoločnosti. Individuálne účty bez pridruženia ku
            spoločnosti nemôžu vytvárať priečinky. Toto zabezpečuje správnu
            organizáciu a kontrolu prístupu k vašim dokumentom.
          </p>
          <div className="bg-muted/50 border-l-4 border-primary p-4 rounded">
            <p className="font-medium mb-2">Dôležité:</p>
            <p className="text-sm text-muted-foreground">
              Nebudete môcť vytvárať priečinky, kým nebudete priradený k účtu
              spoločnosti.
            </p>
          </div>
        </section>

        {/* Creating a Company Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. Ako vytvoriť spoločnosť
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Účty spoločností môže vytvoriť iba správca systému. Ak potrebujete
            vytvoriť novú spoločnosť, kontaktujte nás prosím s nasledujúcimi
            informáciami:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Názov vašej spoločnosti</li>
            <li>Vaša pozícia v spoločnosti</li>
            <li>Predpokladaný počet používateľov</li>
            <li>Váš kontaktný email (registrovaný účet)</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Po vytvorení vašej spoločnosti budete pridaný ako prvý správca a
            môžete začať spravovať priečinky a pridávať členov tímu.
          </p>
        </section>

        {/* Adding Employees Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            4. Pridávanie zamestnancov do vašej spoločnosti
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ako správca spoločnosti môžete pridávať zamestnancov do vašej
            organizácie. To umožňuje členom vášho tímu pristupovať a
            spolupracovať na priečinkoch spoločnosti. Ako pridať zamestnancov:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
            <li>Prejdite do administračného panelu spoločnosti</li>
            <li>Kliknite na "Pridať zamestnanca" alebo "Pozvať používateľa"</li>
            <li>Zadajte emailovú adresu zamestnanca</li>
            <li>Nastavte prístupové oprávnenia</li>
            <li>Odošlite pozvánku</li>
          </ol>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Pozvaní zamestnanci dostanú emailové upozornenie a môžu sa pripojiť
            k vašej spoločnosti po prijatí pozvánky.
          </p>
        </section>

        {/* Next Steps */}
        <section className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">Ďalšie kroky</h2>
          <p className="text-muted-foreground leading-relaxed">
            Keď ste súčasťou spoločnosti, môžete začať vytvárať priečinky,
            nahrávať dokumenty a organizovať vaše súbory. Ak máte akékoľvek
            otázky alebo potrebujete pomoc, neváhajte kontaktovať náš podporný
            tím.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Keď už máte vytvorenú spoločnosť a pridali ste zamestnancov, môžete
            začať vytvárať priečinky a nahrávať dokumenty. Tu mozete nájsť
            niekoľko tipov, ako efektívne spravovať vaše dokumenty:{" "}
            <Link
              href="/help?topic=help"
              className="text-primary hover:underline"
            >
              Pomocník
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default GettingStarted;
