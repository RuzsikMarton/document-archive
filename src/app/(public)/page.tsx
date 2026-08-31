import HomeLanding from "@/components/home-landing";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }
  {
    /* with header: min-h-[calc(100vh-4rem)] */
  }
  return (
    <div className="flex min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex flex-col items-center justify-center w-full">
        <HomeLanding />
      </div>
    </div>
  );
}
