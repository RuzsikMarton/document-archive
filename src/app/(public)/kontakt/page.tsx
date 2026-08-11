import KontaktInfo from "@/components/help/kontakt-info";
import SiteHeader from "@/components/layout/site-header";
import { getSession } from "@/utils/auth";

const KontaktPage = async () => {
  const session = await getSession();
  return (
    <>
      {session?.session && (
        <SiteHeader title={`Vitajte, ${session.user.name}`} showDate={true} />
      )}
      <div className="mx-auto w-full max-w-2xl px-4 py-24">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold uppercase tracking-tighter leading-3.5">
          Kontakt
        </h1>
        <KontaktInfo />
      </div>
    </>
  );
};

export default KontaktPage;
