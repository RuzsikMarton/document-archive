import VerifyEmailContent from "@/components/auth/verify-email-content";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const VerifyEmailPage = async () => {
  const session = await getSession();
  if (session) redirect("/");

  return (
    <main className="flex-center min-h-screen p-6">
      <VerifyEmailContent />
    </main>
  );
};

export default VerifyEmailPage;
