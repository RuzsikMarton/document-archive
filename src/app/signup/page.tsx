import SignUpForm from "@/components/forms/SignUpForm";
import { getSession } from "@/lib/auth/server";
import { redirect } from "next/navigation";

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
