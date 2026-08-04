export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: August 4, 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground leading-7">
            Welcome to Evidio ("Service"), a web application for organizing and
            managing document folders and related information. By accessing or
            using the Service, you agree to be bound by these Terms of Service.
            If you do not agree to these Terms, please do not use the Service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">2. User Accounts</h2>
          <p className="text-muted-foreground leading-7">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account.
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Keep your password secure.</li>
            <li>Provide accurate account information.</li>
            <li>Notify us immediately of unauthorized access.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">3. Acceptable Use</h2>

          <p className="text-muted-foreground leading-7">You agree not to:</p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Use the Service for unlawful purposes.</li>
            <li>Upload malicious or illegal content.</li>
            <li>Attempt to gain unauthorized access to the Service.</li>
            <li>Interfere with the operation of the platform.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">4. User Content</h2>

          <p className="text-muted-foreground leading-7">
            You retain ownership of the information and documents you create or
            upload. You are solely responsible for the legality, accuracy, and
            security of your content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">5. Data Storage</h2>

          <p className="text-muted-foreground leading-7">
            Evidio stores information necessary to provide its services,
            including user accounts, folders, QR code information, company data,
            and document metadata.
          </p>

          <p className="text-muted-foreground leading-7">
            While we take reasonable measures to protect your data, we cannot
            guarantee permanent storage or uninterrupted availability. Users are
            encouraged to maintain backups of important information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>

          <p className="text-muted-foreground leading-7">
            The Evidio platform, including its software, branding, design, and
            related intellectual property, belongs to its owner unless otherwise
            stated.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>

          <p className="text-muted-foreground leading-7">
            To the maximum extent permitted by applicable law, Evidio shall not
            be liable for any indirect, incidental, or consequential damages,
            including loss of data, business interruption, or unauthorized
            access to user accounts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">8. Termination</h2>

          <p className="text-muted-foreground leading-7">
            We reserve the right to suspend or terminate accounts that violate
            these Terms or applicable laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">9. Changes</h2>

          <p className="text-muted-foreground leading-7">
            We may update these Terms from time to time. Continued use of the
            Service after changes become effective constitutes acceptance of the
            revised Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">10. Contact</h2>

          <p className="text-muted-foreground leading-7">
            If you have any questions regarding these Terms, please contact us
            at:
          </p>

          <p className="font-medium">
            Email:{" "}
            <a
              href="mailto:contact@evidio.app"
              className="text-primary hover:underline"
            >
              contact@evidio.app
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
