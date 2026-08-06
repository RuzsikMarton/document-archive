import { Separator } from "@/components/ui/separator";
import { Mail, Info, Shield, Calendar, Building2 } from "lucide-react";
import { requireAuth } from "@/utils/auth";
import ProfileForm from "@/components/account/profile-form";
import EmailForm from "@/components/account/email-form";
import ChangePasswordForm from "@/components/account/changepassword-form";
import DeleteAccountSection from "@/components/account/deleta-account-section";

const AccountSettingsPage = async () => {
  const session = await requireAuth("/account/settings");

  return (
    <main className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nastavenia účtu</h1>
          <p className="text-muted-foreground mt-2">
            Spravujte nastavenia a preferencie svojho účtu
          </p>
        </div>

        <Separator />
        <ProfileForm name={session.user.name || ""} />
        <EmailForm email={session.user.email || ""} />

        <ChangePasswordForm />

        {/* Account Information Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
              <Info className="size-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Informácie o účte</h2>
              <p className="text-sm text-muted-foreground">
                Zobraziť informácie o svojom účte
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-slate-100 dark:bg-card p-6 space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">ID účtu</span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {session.user.id.substring(0, 16)}...
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">Člen od</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(session.user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">Email overený</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {session.user.emailVerified ? "Áno" : "Nie"}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <Building2 className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">Organizácia / Tím</span>
              </div>
              <span className="text-sm text-muted-foreground"></span>
            </div>
          </div>
        </section>

        {/* Danger Zone Section */}
        <DeleteAccountSection />
      </div>
    </main>
  );
};

export default AccountSettingsPage;
