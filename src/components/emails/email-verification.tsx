import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailVerificationProps {
  companyName: string;
  userName: string;
  url: string;
}

export const EmailVerification = ({
  companyName = "Evidio",
  userName = "there",
  url,
}: EmailVerificationProps) => (
  <Html>
    <Head />
    <Preview>Potvrďte svoju e-mailovú adresu pre {companyName}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>Evidio</Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>Overenie e-mailovej adresy</Heading>

          <Text style={text}>Ahoj {userName},</Text>

          <Text style={text}>
            Ďakujeme za registráciu! Prosím, potvrďte svoju e-mailovú adresu
            kliknutím na tlačidlo nižšie. Tým dokončíte vytvorenie účtu a
            získate prístup k všetkým funkciám.
          </Text>

          <Section style={buttonContainer}>
            <Button href={url} style={button}>
              Overiť e-mail
            </Button>
          </Section>

          <Text style={textSecondary}>
            Tento odkaz vyprší o 24 hodín z bezpečnostných dôvodov.
          </Text>

          <Hr style={divider} />

          <Text style={textMuted}>
            Ak ste sa neregistrovali na {companyName}, môžete tento e-mail
            bezpečne ignorovať.
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

export default EmailVerification;

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
  color: "#2563eb",
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
