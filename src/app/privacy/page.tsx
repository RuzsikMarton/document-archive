// app/privacy/page.tsx

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="space-y-12">
        {/* Header */}
        <section>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>

          <p className="mt-3 text-muted-foreground">
            <strong>Last updated:</strong> August 4, 2026
          </p>

          <p className="mt-6 leading-7 text-muted-foreground">
            This Privacy Policy explains how <strong>Evidio</strong> ("we",
            "our", or "us") collects, uses, stores, and protects your personal
            data when you use our document management platform.
          </p>

          <p className="mt-4 leading-7 text-muted-foreground">
            We are committed to protecting your privacy and processing your
            personal data in accordance with the General Data Protection
            Regulation (EU) 2016/679 ("GDPR") and other applicable data
            protection laws.
          </p>
        </section>

        {/* Data Controller */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Data Controller</h2>

          <p className="leading-7 text-muted-foreground">
            The controller responsible for processing your personal data is:
          </p>

          <div className="rounded-lg border p-5">
            <p>
              <strong>Evidio</strong>
            </p>

            <p>Your Name / Company Name</p>

            <p>
              Email:{" "}
              <a
                href="mailto:contact@evidio.app"
                className="text-primary hover:underline"
              >
                contact@evidio.app
              </a>
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            Please replace the above information with your legal business or
            personal details before publishing this policy.
          </p>
        </section>

        {/* What is Personal Data */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. What Is Personal Data?</h2>

          <p className="leading-7 text-muted-foreground">
            Personal data means any information relating to an identified or
            identifiable natural person. This includes information such as your
            name, email address, online identifiers, authentication information,
            or any other information that can identify you directly or
            indirectly.
          </p>
        </section>

        {/* Data Collected */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3. Personal Data We Collect
          </h2>

          <p className="leading-7 text-muted-foreground">
            Depending on how you use Evidio, we may collect and process the
            following categories of personal data:
          </p>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Category
                  </th>

                  <th className="px-4 py-3 text-left font-semibold">
                    Examples
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">Account Information</td>

                  <td className="px-4 py-3 text-muted-foreground">
                    Name, email address, profile image.
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">Authentication</td>

                  <td className="px-4 py-3 text-muted-foreground">
                    Session identifiers, authentication tokens, login sessions.
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">Application Data</td>

                  <td className="px-4 py-3 text-muted-foreground">
                    Folder names, archive information, document metadata, QR
                    code references, transfer information and related records.
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">Company Information</td>

                  <td className="px-4 py-3 text-muted-foreground">
                    Company memberships, company owner, employee assignments and
                    permissions.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 font-medium">
                    Technical Information
                  </td>

                  <td className="px-4 py-3 text-muted-foreground">
                    IP address, browser type, operating system, device
                    information, request timestamps and security logs.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="leading-7 text-muted-foreground">
            We only collect information that is necessary to provide, secure,
            improve and maintain the Evidio platform.
          </p>
        </section>

        {/* How Data Is Used */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            4. How We Use Your Personal Data
          </h2>

          <p className="leading-7 text-muted-foreground">
            We process your personal data for the following purposes:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Create and manage user accounts.</li>

            <li>Authenticate users securely.</li>

            <li>Maintain active login sessions.</li>

            <li>Store and organize folders and archive data.</li>

            <li>Generate and manage QR codes.</li>

            <li>Allow collaboration between company members.</li>

            <li>Protect the application against abuse and fraud.</li>

            <li>Provide customer support.</li>

            <li>Monitor application stability and security.</li>

            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        {/* Legal Basis */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            5. Legal Basis for Processing
          </h2>

          <p className="leading-7 text-muted-foreground">
            We process personal data under one or more of the following legal
            bases provided by Article 6 of the GDPR:
          </p>

          <div className="space-y-5 rounded-lg border p-5">
            <div>
              <h3 className="font-semibold">
                Performance of a Contract (Article 6(1)(b))
              </h3>

              <p className="mt-2 text-muted-foreground">
                Processing is necessary to provide your Evidio account, manage
                folders, authenticate users, and deliver the services requested
                by you.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Legal Obligation (Article 6(1)(c))
              </h3>

              <p className="mt-2 text-muted-foreground">
                We may process personal data where required to comply with
                applicable laws or requests from competent authorities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Legitimate Interests (Article 6(1)(f))
              </h3>

              <p className="mt-2 text-muted-foreground">
                We process certain technical information to ensure the security,
                reliability and proper functioning of the platform, prevent
                unauthorized access, detect abuse and improve the service.
              </p>
            </div>
          </div>
        </section>
        {/* Hosting */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            6. Hosting & Infrastructure
          </h2>

          <p className="leading-7 text-muted-foreground">
            Evidio is hosted on <strong>Vercel Inc.</strong>, which provides the
            infrastructure required to deliver the application over the
            internet.
          </p>

          <p className="leading-7 text-muted-foreground">
            When you access Evidio, Vercel may process technical information
            necessary to securely deliver the application, including:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>IP address</li>
            <li>Browser and device information</li>
            <li>Request timestamps</li>
            <li>HTTP request metadata</li>
            <li>Error logs</li>
            <li>Security-related logs</li>
          </ul>

          <p className="leading-7 text-muted-foreground">
            This information is processed solely for hosting, security,
            performance optimization and ensuring the reliable operation of the
            Service.
          </p>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Hosting Provider</h3>

            <p className="mt-3 text-muted-foreground">
              <strong>Vercel Inc.</strong>
            </p>

            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-primary hover:underline"
            >
              Vercel Privacy Policy
            </a>
          </div>
        </section>

        {/* Database */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Database Provider</h2>

          <p className="leading-7 text-muted-foreground">
            User data is securely stored in a PostgreSQL database hosted by
            <strong> Neon</strong>.
          </p>

          <p className="leading-7 text-muted-foreground">
            Neon acts as our database infrastructure provider and processes
            personal data only for securely storing and retrieving information
            required for the operation of Evidio.
          </p>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Database Provider</h3>

            <p className="mt-3 text-muted-foreground">
              <strong>Neon Inc.</strong>
            </p>

            <a
              href="https://neon.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-primary hover:underline"
            >
              Neon Privacy Policy
            </a>
          </div>
        </section>

        {/* Authentication */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            8. Authentication & User Sessions
          </h2>

          <p className="leading-7 text-muted-foreground">
            Evidio uses secure authentication to verify user identities and
            provide access to protected features.
          </p>

          <p className="leading-7 text-muted-foreground">
            During authentication we may process:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>User account identifiers.</li>

            <li>Email address.</li>

            <li>Encrypted session tokens.</li>

            <li>Session expiration information.</li>

            <li>Login timestamps.</li>

            <li>IP address and browser information for security purposes.</li>
          </ul>

          <p className="leading-7 text-muted-foreground">
            This information is processed solely for authentication,
            authorization, fraud prevention and account security.
          </p>
        </section>

        {/* Cookies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Cookies</h2>

          <p className="leading-7 text-muted-foreground">
            Evidio uses only cookies that are strictly necessary for the proper
            operation of the Service.
          </p>

          <p className="leading-7 text-muted-foreground">
            These cookies are used for:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Keeping users signed in.</li>

            <li>Maintaining authenticated sessions.</li>

            <li>Protecting user accounts.</li>

            <li>Preventing unauthorized access.</li>

            <li>Security purposes.</li>
          </ul>

          <p className="leading-7 text-muted-foreground">
            We do not use advertising cookies and we do not sell or share cookie
            data with advertisers.
          </p>

          <p className="leading-7 text-muted-foreground">
            If optional analytics or marketing cookies are introduced in the
            future, this Privacy Policy will be updated and, where required by
            law, your consent will be requested before they are used.
          </p>
        </section>

        {/* Third Parties */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Third-Party Services</h2>

          <p className="leading-7 text-muted-foreground">
            We use trusted third-party providers to operate the Service.
          </p>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Provider
                  </th>

                  <th className="px-4 py-3 text-left font-semibold">Purpose</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">Vercel</td>

                  <td className="px-4 py-3 text-muted-foreground">
                    Application hosting and infrastructure.
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-4 py-3 font-medium">Neon</td>

                  <td className="px-4 py-3 text-muted-foreground">
                    PostgreSQL database hosting.
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-3 font-medium">
                    Cloudinary (if enabled)
                  </td>

                  <td className="px-4 py-3 text-muted-foreground">
                    Storage of uploaded images and QR code images.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="leading-7 text-muted-foreground">
            Each provider processes personal data only to the extent necessary
            for delivering its services to Evidio.
          </p>
        </section>

        {/* International Transfers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            11. International Data Transfers
          </h2>

          <p className="leading-7 text-muted-foreground">
            Some of our service providers may process personal data outside your
            country of residence.
          </p>

          <p className="leading-7 text-muted-foreground">
            Whenever personal data is transferred outside the European Economic
            Area (EEA), we ensure that appropriate safeguards are in place as
            required by the GDPR. These safeguards may include:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>European Commission adequacy decisions.</li>

            <li>Standard Contractual Clauses (SCCs).</li>

            <li>Other legally approved transfer mechanisms.</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            12. Sharing of Personal Data
          </h2>

          <p className="leading-7 text-muted-foreground">
            We do <strong>not</strong> sell, rent or trade your personal data.
          </p>

          <p className="leading-7 text-muted-foreground">
            Personal data may be shared only:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>With service providers necessary for operating Evidio.</li>

            <li>When required by applicable law.</li>

            <li>To protect our legal rights or prevent fraud and abuse.</li>

            <li>
              If required by courts or competent governmental authorities.
            </li>
          </ul>

          <p className="leading-7 text-muted-foreground">
            We never sell your personal information to third parties.
          </p>
        </section>
        {/* Data Retention */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">13. Data Retention</h2>

          <p className="leading-7 text-muted-foreground">
            We retain your personal data only for as long as necessary to
            provide the Service, comply with legal obligations, resolve
            disputes, and enforce our agreements.
          </p>

          <p className="leading-7 text-muted-foreground">In general:</p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              Account information is retained while your account remains active.
            </li>

            <li>
              Folder and company data is retained until you delete it or your
              account is removed.
            </li>

            <li>
              Authentication sessions are automatically removed after they
              expire.
            </li>

            <li>
              Technical logs are retained only for the period necessary for
              security, troubleshooting, and legal compliance.
            </li>
          </ul>

          <p className="leading-7 text-muted-foreground">
            When personal data is no longer required, it will be securely
            deleted or anonymized unless applicable law requires a longer
            retention period.
          </p>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            14. Security of Personal Data
          </h2>

          <p className="leading-7 text-muted-foreground">
            We implement appropriate technical and organizational measures to
            protect personal data against unauthorized access, accidental loss,
            alteration, disclosure, or destruction.
          </p>

          <p className="leading-7 text-muted-foreground">
            These measures include, where appropriate:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Encrypted HTTPS connections.</li>

            <li>Secure authentication and session management.</li>

            <li>Access controls and authorization.</li>

            <li>Database security provided by Neon.</li>

            <li>Infrastructure security provided by Vercel.</li>

            <li>Regular dependency and security updates.</li>
          </ul>

          <p className="leading-7 text-muted-foreground">
            Although we strive to use commercially acceptable means to protect
            your information, no method of electronic transmission or storage is
            completely secure.
          </p>
        </section>

        {/* User Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            15. Your Rights Under the GDPR
          </h2>

          <p className="leading-7 text-muted-foreground">
            If you are located within the European Economic Area (EEA), you have
            the following rights regarding your personal data:
          </p>

          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Right to access your personal data.</li>

            <li>Right to rectify inaccurate or incomplete data.</li>

            <li>Right to erasure ("Right to be Forgotten").</li>

            <li>Right to restrict processing.</li>

            <li>Right to object to processing.</li>

            <li>Right to data portability.</li>

            <li>
              Right to withdraw consent at any time where processing is based on
              consent.
            </li>

            <li>
              Right to lodge a complaint with your local supervisory authority.
            </li>
          </ul>

          <p className="leading-7 text-muted-foreground">
            If you wish to exercise any of these rights, please contact us using
            the contact information provided below.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">16. Children's Privacy</h2>

          <p className="leading-7 text-muted-foreground">
            Evidio is not intended for children under the age of 16.
          </p>

          <p className="leading-7 text-muted-foreground">
            We do not knowingly collect personal information from children. If
            you believe that a child has provided us with personal data, please
            contact us immediately so that we can delete the information.
          </p>
        </section>

        {/* Policy Changes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            17. Changes to This Privacy Policy
          </h2>

          <p className="leading-7 text-muted-foreground">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, legal requirements, or the functionality
            of Evidio.
          </p>

          <p className="leading-7 text-muted-foreground">
            The latest version will always be available on this page. We
            encourage you to review this Privacy Policy periodically.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">18. Contact Information</h2>

          <p className="leading-7 text-muted-foreground">
            If you have any questions regarding this Privacy Policy or wish to
            exercise your rights under the GDPR, please contact us:
          </p>

          <div className="rounded-lg border p-5">
            <p>
              <strong>Martin Ruzsik</strong>
            </p>
            <p>Slovakia</p>
            <a
              href="mailto:marton.ruzsik@icloud.com"
              className="mt-2 inline-block text-primary hover:underline"
            >
              marton.ruzsik@icloud.com
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
