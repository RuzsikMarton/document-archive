import KontaktInfo from "@/components/help/kontakt-info";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const KontaktPage = async () => {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-24 pt-8 md:pt-12">
      <Link href="/" className="flex justify-end mb-16 md:mb-24">
        <Button variant={"outline"}>
          <ArrowLeft /> Späť na hlavnú stránku
        </Button>
      </Link>
      <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase tracking-tighter leading-3.5">
        Kontakt
      </h1>
      <KontaktInfo />
    </div>
  );
};

export default KontaktPage;
