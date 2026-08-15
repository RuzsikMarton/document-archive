import { requireAuth } from "@/utils/auth";
import SiteHeader from "@/components/layout/site-header";
import ChangePasswordForm from "@/components/account/changepassword-form";
import AccountSettingsCard from "@/components/account/account-settings";
import AccountInfo from "@/components/account/account-info";
import DeleteAccountSection from "@/components/account/deleta-account-section";
import AccountBadges from "@/components/account/account-badges";
import AccountCompany from "@/components/account/account-company";

const AccountPage = async () => {
  const session = await requireAuth("/account/settings");

  return (
    <>
      {session.session && <SiteHeader title="Nastavenie účtu" />}

      <div className="grid grid-cols-1 gap-6 p-4 lg:p-8 lg:grid-cols-2">
        <div className="space-y-6">
          <AccountSettingsCard
            name={session.user.name}
            email={session.user.email}
            emailVerified={session.user.emailVerified}
          />
          <AccountInfo
            userId={session.user.id}
            createdAt={session.user.createdAt}
            role={session.user.role}
          />
          <AccountBadges user={session.user} />
        </div>

        <div className="space-y-6">
          <AccountCompany user={session.user} />
          <ChangePasswordForm />
          <DeleteAccountSection />
        </div>
      </div>
    </>
  );
};

export default AccountPage;
