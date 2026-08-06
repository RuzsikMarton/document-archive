import SignUpForm from "@/components/forms/sign-up-form";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/auth";

const SignUpPage = async () => {
  const session = await getSession();

  if (session) redirect("/");
  return (
    <main className="flex-center min-h-screen p-6">
      <SignUpForm />
    </main>
  );
};

export default SignUpPage;
