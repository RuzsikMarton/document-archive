import SignInForm from "@/components/forms/SignInForm";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getSession();

  if (session) redirect("/");
  return (
    <main className="flex-center min-h-screen p-6">
      <SignInForm />
    </main>
  );
};

export default SignInPage;
