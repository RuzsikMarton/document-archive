const AboutPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">O projekte Evidio</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Moderná webová aplikácia na evidenciu, správu a organizáciu fyzických
          šanónov pomocou QR kódov.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Čo je Evidio?</h2>

        <p className="text-muted-foreground leading-8">
          Evidio je aplikácia navrhnutá na zjednodušenie práce s fyzickými
          dokumentmi a archívnymi šanónmi. Umožňuje vytvárať elektronickú
          evidenciu šanónov, jednoducho ich vyhľadávať a pomocou QR kódov ich
          rýchlo identifikovať.
        </p>

        <p className="text-muted-foreground leading-8">
          Cieľom projektu je nahradiť papierové zoznamy a neprehľadné tabuľky
          moderným systémom, ktorý poskytuje rýchly prístup k informáciám o
          uložených dokumentoch.
        </p>
      </section>
      <section className="bg-muted/50 border-l-4 border-primary p-6 rounded">
        <p className="text-sm text-muted-foreground">
          <strong>Poznámka:</strong> Keďže ide o hobby projekt, funkcie a
          dostupnosť môžu byť obmedzené. Aplikácia je neustále vyvíjaná a
          vylepšovaná.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Pre koho je určené?</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>účtovné kancelárie,</li>
          <li>malé a stredné spoločnosti,</li>
          <li>firmy spravujúce archív dokumentov,</li>
          <li>administratívnych pracovníkov,</li>
          <li>každého, kto potrebuje mať prehľad o fyzických šanónoch.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Hlavné funkcie</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold mb-2">📁 Evidencia šanónov</h3>
            <p className="text-sm text-muted-foreground">
              Vytváranie a správa záznamov o fyzických šanónoch.
            </p>
          </div>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold mb-2">🔍 Vyhľadávanie</h3>
            <p className="text-sm text-muted-foreground">
              Rýchle filtrovanie a vyhľadávanie podľa názvu, roku alebo obsahu.
            </p>
          </div>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold mb-2">📱 QR kódy</h3>
            <p className="text-sm text-muted-foreground">
              Každý šanón môže obsahovať QR kód pre jednoduchú identifikáciu.
            </p>
          </div>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold mb-2">👥 Správa spoločností</h3>
            <p className="text-sm text-muted-foreground">
              Podpora viacerých spoločností, vlastníkov a zamestnancov.
            </p>
          </div>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold mb-2">📄 Preberacie protokoly</h3>
            <p className="text-sm text-muted-foreground">
              Generovanie protokolov pri odovzdaní dokumentácie.
            </p>
          </div>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold mb-2">
              ✅ Evidencia odovzdaných šanónov
            </h3>
            <p className="text-sm text-muted-foreground">
              Sledovanie vydaných šanónov vrátane dátumu odovzdania.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Prečo vznikol projekt?</h2>

        <p className="text-muted-foreground leading-8">
          Evidio je hobby projekt s cieľom vytvoriť jednoduché, moderné a
          praktické riešenie pre správu fyzických dokumentov. Zároveň slúži ako
          priestor na skúmanie moderných webových technológií a osvedčených
          postupov pri vývoji full-stack aplikácií.
        </p>
        <p className="text-muted-foreground leading-8">
          Projekt vyvíjam vo svojom voľnom čase popri práci. Nestojí za ním
          žiadna spoločnosť ani marketingový tím – všetky funkcie, návrh
          používateľského rozhrania aj samotný vývoj vznikajú postupne s dôrazom
          na jednoduchosť, praktickosť a neustále zlepšovanie aplikácie.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Použité technológie</h2>

        <div className="flex flex-wrap gap-2">
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Prisma",
            "PostgreSQL",
            "Tailwind CSS",
            "shadcn/ui",
            "Better Auth",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-3 py-1 text-sm bg-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-primary/20 bg-primary/5 p-6">
        <h2 className="text-xl font-semibold mb-2">🚧 Projekt je vo vývoji</h2>

        <p className="text-muted-foreground leading-7">
          Evidio je aktívne vyvíjaný projekt. Nové funkcie, vylepšenia
          používateľského rozhrania a optimalizácie sú postupne pridávané s
          cieľom vytvoriť spoľahlivý nástroj pre správu firemnej dokumentácie.
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
