import { getSession } from "@/utils/auth";
import Help from "@/components/help/help";
import GettingStarted from "@/components/help/getting-started";
import SiteHeader from "@/components/layout/site-header";

const HelpPage = async (props: {
  searchParams?: Promise<{
    topic?: string;
  }>;
}) => {
  const session = await getSession();
  const searchParams = await props.searchParams;
  const topic = searchParams?.topic || undefined;

  return (
    <>
      {session?.session && (
        <SiteHeader
          title={`Vitajte, ${session.user.name}`}
          showDate={false}
          showButton={{ href: "/folders", text: "Späť na záznamy" }}
        />
      )}
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {topic === "getting-started" ? (
          <GettingStarted />
        ) : (
          <Help session={session} />
        )}
      </div>
    </>
  );
};

export default HelpPage;
