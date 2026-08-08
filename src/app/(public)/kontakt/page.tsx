import KontaktInfo from "@/components/kontakt-info";

const KontaktPage = () => {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-24">
      <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase tracking-tighter leading-3.5">
        Kontakt
      </h1>
      <KontaktInfo />
    </main>
  );
};

export default KontaktPage;
