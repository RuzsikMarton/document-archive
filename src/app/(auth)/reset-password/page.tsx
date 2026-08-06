import ResetPasswordForm from "@/components/forms/reset-password-form";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const ResetPasswordPage = async () => {
  const session = await getSession();

  if (session) redirect("/");
  return (
    <main className="flex-center min-h-full p-6 my-24 sm:mt-24 sm:mb-32">
      <ResetPasswordForm />
    </main>
  );
};

export default ResetPasswordPage;
