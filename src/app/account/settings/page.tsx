import { Separator } from "@/components/ui/separator";
import { requireAuth } from "@/utils/auth";
import ProfileForm from "@/components/account/profile-form";
import EmailForm from "@/components/account/email-form";
import ChangePasswordForm from "@/components/account/changepassword-form";
import DeleteAccountSection from "@/components/account/deleta-account-section";
import AccountInfo from "@/components/account/account-info";
import SiteHeader from "@/components/layout/site-header";

const AccountSettingsPage = async () => {
  const session = await requireAuth("/account/settings");

  return (
    <>
      {session.session && <SiteHeader />}
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Nastavenia účtu
            </h1>
            <p className="text-muted-foreground mt-2">
              Spravujte nastavenia a preferencie svojho účtu
            </p>
          </div>

          <Separator />
          <ProfileForm name={session.user.name || ""} />
          <EmailForm email={session.user.email || ""} />

          <ChangePasswordForm />

          {/* Account Information Section */}
          <AccountInfo
            userId={session.user.id}
            createdAt={session.user.createdAt}
            emailVerified={session.user.emailVerified}
            companyName={session.user.companyName}
          />

          {/* Danger Zone Section */}
          <DeleteAccountSection />
        </div>
      </div>
    </>
  );
};

export default AccountSettingsPage;
