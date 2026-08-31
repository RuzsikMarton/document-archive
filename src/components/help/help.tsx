import {
  AlertCircle,
  BookOpen,
  FolderPlus,
  Search,
  Trash2,
  Download,
  Edit,
  Filter,
  FileText,
  CheckCircle,
  QrCode,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const Help = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pomocník</h1>
          <p className="text-muted-foreground mt-2">
            Naučte sa používať aplikáciu Evidio
          </p>
        </div>
        <Link href="/" className="order-1 md:order-2 shrink-0 md:self-start">
          <Button variant="outline">
            <ArrowLeft />
            <span className="hidden md:block">Späť na hlavnú stránku</span>
          </Button>
        </Link>
      </div>

      <Separator />

      {/* Introduction */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
            <BookOpen className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Úvod</h2>
            <p className="text-sm text-muted-foreground">
              Základné informácie o aplikácii
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 space-y-3">
          <p className="text-base">
            <strong>Evidio</strong> je aplikácia určená na správu a evidenciu
            fyzických priečinkov s dokumentmi. Umožňuje vám jednoducho vytvárať
            záznamy, sledovať ich stav a efektívne spravovať vašu dokumentáciu.
          </p>
          <p className="text-base">
            Každý záznam môže obsahovať informácie ako názov, rok, obdobie,
            obsah a QR kód pre jednoduchú identifikáciu.
          </p>
        </div>
      </section>

      {/* Creating Folders */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-500/20">
            <FolderPlus className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              Vytvorenie nového záznamu
            </h2>
            <p className="text-sm text-muted-foreground">
              Ako pridať nový záznam do systému
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Postup:</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li className="text-base">
                Kliknite na tlačidlo{" "}
                <span className="font-semibold text-primary">
                  &quot;Nový záznam&quot; / &quot;Pridať záznam&quot;
                </span>{" "}
                v lavom hornom rohu
              </li>
              <li className="text-base">
                Vyplňte povinné údaje:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                  <li>
                    <strong>Názov / Firma</strong> - identifikácia priečinka
                    (max. 30 znakov)
                  </li>
                  <li>
                    <strong>Rok</strong> - rok vytvorenia alebo evidencie
                  </li>
                </ul>
              </li>
              <li className="text-base">
                Kliknite na{" "}
                <span className="font-semibold">&quot;Vytvoriť&quot;</span>
              </li>
              <li className="text-base">
                Automaticky budete presmerovaní na detail záznamu, kde môžete
                doplniť ďalšie informácie
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Viewing and Searching */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-500/20">
            <Search className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              Prezeranie a vyhľadávanie
            </h2>
            <p className="text-sm text-muted-foreground">
              Ako nájsť potrebný záznam
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Vyhľadávanie:</h3>
            <p className="text-base">
              Použite vyhľadávacie pole na rýchle nájdenie záznamu podľa názvu,
              obsahu alebo iných údajov. Vyhľadávanie funguje v reálnom čase.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Filter className="size-4" />
              Filtrovanie:
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li className="text-base">
                <strong>Stav</strong> - zobraziť všetky záznamy, len vydané
                alebo len nevydané
              </li>
              <li className="text-base">
                <strong>Rok</strong> - filtrovať záznamy podľa konkrétneho roku
              </li>
              <li className="text-base">
                <strong>Zoradenie</strong> - zoradiť záznamy vzostupne alebo
                zostupne
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Editing Folders */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-500/20">
            <Edit className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Úprava záznamu</h2>
            <p className="text-sm text-muted-foreground">
              Ako upraviť existujúci záznam
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Postup:</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li className="text-base">Kliknite na záznam v zozname</li>
              <li className="text-base">
                Na detailnej stránke kliknite na tlačidlo{" "}
                <span className="font-semibold">&quot;Upraviť&quot;</span>
              </li>
              <li className="text-base">
                Upravte požadované údaje:
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                  <li>
                    <strong>Názov</strong> - zmena názvu priečinka
                  </li>
                  <li>
                    <strong>Rok</strong> - úprava roku
                  </li>
                  <li>
                    <strong>Mesiac od / do</strong> - časové obdobie obsahu
                  </li>
                  <li>
                    <strong>Obsah</strong> - podrobný popis obsahu priečinka
                  </li>
                </ul>
              </li>
              <li className="text-base">
                Kliknite na{" "}
                <span className="font-semibold">&quot;Uložiť zmeny&quot;</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* QR Code */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-500/20">
            <QrCode className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">QR kód</h2>
            <p className="text-sm text-muted-foreground">
              Generovanie a používanie QR kódov
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-base">
              Každý záznam automaticky vygeneruje QR kód, ktorý obsahuje
              informácie o priečinku.
            </p>
            <h3 className="text-lg font-medium">Ako používať:</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li className="text-base">
                QR kód sa zobrazuje na detailnej stránke záznamu
              </li>
              <li className="text-base">
                Kliknite na tlačidlo{" "}
                <span className="font-semibold inline-flex items-center gap-1">
                  <Download className="size-3" /> Stiahnuť QR kód
                </span>{" "}
                na stiahnutie ako PDF
              </li>
              <li className="text-base">
                Vytlačte QR kód a prilepte ho na fyzický priečinok
              </li>
              <li className="text-base">
                Naskenovaním kódu sa rýchlo dostanete na detail záznamu
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Handed Over Status */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-500/20">
            <CheckCircle className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Stav vydania</h2>
            <p className="text-sm text-muted-foreground">
              Sledovanie vydaných priečinkov
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-base">
              Funkcia &quot;Vydané&quot; slúži na sledovanie priečinkov, ktoré
              boli odovzdané alebo zapožičané.
            </p>
            <h3 className="text-lg font-medium">Ako označiť ako vydané:</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li className="text-base">Otvorte detail záznamu</li>
              <li className="text-base">
                Aktivujte prepínač{" "}
                <span className="font-semibold">&quot;Vydané&quot;</span>
              </li>
              <li className="text-base">
                Automaticky sa zaznamená dátum a čas vydania
              </li>
              <li className="text-base">
                Pri vrátení priečinka prepínač deaktivujte
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Deleting Folders */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
            <Trash2 className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Vymazanie záznamu</h2>
            <p className="text-sm text-muted-foreground">
              Trvalé odstránenie záznamu
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-destructive/50 bg-card p-6 space-y-4">
          <div className="space-y-2">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-3">
              <p className="text-sm text-destructive font-medium">
                <AlertCircle className="size-4 inline-block mr-1" />{" "}
                Upozornenie: Vymazanie je trvalé a nedá sa vrátiť späť!
              </p>
            </div>
            <h3 className="text-lg font-medium">Postup:</h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li className="text-base">Otvorte detail záznamu</li>
              <li className="text-base">
                Prejdite do režimu úprav kliknutím na{" "}
                <span className="font-semibold">&quot;Upraviť&quot;</span>
              </li>
              <li className="text-base">
                Kliknite na tlačidlo{" "}
                <span className="font-semibold text-destructive">
                  &quot;Vymazať záznam&quot;
                </span>
              </li>
              <li className="text-base">
                Potvrďte vymazanie v dialógovom okne
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 dark:bg-yellow-500/20">
            <FileText className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Tipy a triky</h2>
            <p className="text-sm text-muted-foreground">
              Užitočné rady pre efektívnu prácu
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 space-y-3">
          <ul className="list-disc list-inside space-y-2">
            <li className="text-base">
              <strong>Používajte QR kódy</strong> - prilepte ich na fyzické
              priečinky pre rýchlu identifikáciu
            </li>
            <li className="text-base">
              <strong>Vypĺňajte obsah</strong> - podrobný popis obsahu uľahčuje
              neskoršie vyhľadávanie
            </li>
            <li className="text-base">
              <strong>Aktualizujte stav vydania</strong> - pravidelne označujte
              vydané priečinky
            </li>
            <li className="text-base">
              <strong>Využívajte filtrovanie</strong> - pri veľkom množstve
              záznamov použite filtre pre rýchlejšie nájdenie
            </li>
            <li className="text-base">
              <strong>Nastavte časové obdobie</strong> - zadajte mesiac od/do
              pre lepšiu organizáciu
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <div className="pt-6 pb-4 text-center text-sm text-muted-foreground">
        <p>
          Potrebujete ďalšiu pomoc? Kontaktujte správcu systému{" "}
          <span>
            tu:{" "}
            <Link href="/kontakt" className="text-primary hover:underline">
              kontakt
            </Link>
            .
          </span>
        </p>
      </div>
    </div>
  );
};

export default Help;
