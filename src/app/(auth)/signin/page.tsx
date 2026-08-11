import SignInForm from "@/components/forms/sign-in-form";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await getSession();

  if (session) redirect("/");
  return (
    <div className="flex-center min-h-screen p-6">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
