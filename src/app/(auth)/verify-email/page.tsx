import VerifyEmailContent from "@/components/auth/verify-email-content";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const VerifyEmailPage = async () => {
  const session = await getSession();
  if (session) redirect("/");

  return (
    <div className="flex-center min-h-screen p-6">
      <VerifyEmailContent />
    </div>
  );
};

export default VerifyEmailPage;
