import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Use Cloudinary or any public image hosting for email images
interface PasswordResetEmailProps {
  companyName: string;
  userName: string;
  url: string;
}

export const PasswordResetEmail = ({
  companyName = "Evidio",
  userName = "there",
  url,
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password for {companyName}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>Evidio</Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>Resetovanie hesla</Heading>

          <Text style={text}>Ahoj {userName},</Text>

          <Text style={text}>
            Dostali sme požiadavku na obnovenie hesla pre váš účet. Ak ste túto
            žiadosť podali vy, kliknite na tlačidlo nižšie a nastavte si nové
            heslo.
          </Text>

          <Section style={buttonContainer}>
            <Button href={url} style={button}>
              Zmeniť heslo
            </Button>
          </Section>
          <Text style={textSecondary}>
            Ak tlačidlo nefunguje, skopírujte a vložte nasledujúci odkaz do
            vášho prehliadača:
          </Text>

          <Text style={linkContainer}>
            <Link href={url} style={link}>
              {url}
            </Link>
          </Text>

          <Text style={textSecondary}>
            Tento odkaz vyprší o 24 hodín z bezpečnostných dôvodov.
          </Text>

          <Hr style={divider} />

          <Text style={textMuted}>
            Ak ste o obnovenie hesla nepožiadali, môžete tento e-mail bezpečne
            ignorovať. Vaše heslo zostane nezmenené.
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            © 2026 {companyName}. Všetky práva vyhradené.
          </Text>

          <Section style={socialLinks}>
            <Link
              href="https://www.linkedin.com/in/márton-ruzsik-47561b313/"
              style={socialLink}
            >
              LinkedIn
            </Link>
            {" • "}
            <Link href="https://martonruzsik.sk/sk" style={socialLink}>
              Website
            </Link>
            {" • "}
            <Link href="https://github.com/RuzsikMarton" style={socialLink}>
              GitHub
            </Link>
          </Section>

          <Text style={footerTextSmall}>
            martonruzsik.sk | marton.ruzsik@icloud.com
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "580px",
};

const header = {
  padding: "28px 20px",
  textAlign: "center" as const,
  color: "#085efb",
  fontSize: "24px",
};

const content = {
  padding: "0 48px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.3",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "16px 0",
};

const textSecondary = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "16px 0",
  textAlign: "center" as const,
};

const textMuted = {
  color: "#9ca3af",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "16px 0",
};

const buttonContainer = {
  margin: "32px 0",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "8px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "1.5",
  padding: "14px 32px",
  textDecoration: "none",
  textAlign: "center" as const,
};

const linkContainer = {
  backgroundColor: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "12px",
  margin: "16px 0 24px",
  wordBreak: "break-all" as const,
};

const link = {
  color: "#2563eb",
  fontSize: "14px",
  textDecoration: "none",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  padding: "0 48px",
  marginTop: "32px",
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "8px 0",
  textAlign: "center" as const,
};

const socialLinks = {
  textAlign: "center" as const,
  margin: "16px 0",
};

const socialLink = {
  color: "#085efb",
  fontSize: "14px",
  textDecoration: "none",
};

const footerTextSmall = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "8px 0",
  textAlign: "center" as const,
};
