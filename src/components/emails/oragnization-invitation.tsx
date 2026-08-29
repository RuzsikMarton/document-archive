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

interface OrganizationInvitationEmailProps {
  email: string;
  invitedByUsername: string;
  invitedByEmail: string;
  teamName: string;
  inviteLink: string;
}

export const OrganizationInvitationEmail = (
  props: OrganizationInvitationEmailProps,
) => (
  <Html>
    <Head />
    <Preview>
      {props.invitedByUsername} vás pozval do organizácie {props.teamName}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>Evidio</Section>

        {/* Main Content */}
        <Section style={content}>
          <Heading style={h1}>Pozvánka do organizácie</Heading>

          <Text style={text}>Ahoj {props.email},</Text>

          <Text style={text}>
            <strong>{props.invitedByUsername}</strong> ({props.invitedByEmail})
            vás pozval do organizácie <strong>{props.teamName}</strong>.
          </Text>

          <Text style={text}>
            Pripojením sa k tejto organizácii získate prístup k zdieľaným
            dokumentom, projektom a možnosť spolupracovať s ostatnými členmi
            tímu.
          </Text>

          <Text style={text}>
            Ak ešte nemáte účet, po kliknutí na tlačidlo si ho budete môcť
            vytvoriť. Ak už účet máte, po overení e-mailu sa jednoducho
            prihlásite.
          </Text>

          <Section style={buttonContainer}>
            <Button href={props.inviteLink} style={button}>
              Prijať pozvánku
            </Button>
          </Section>

          <Text style={textSecondary}>
            Ak tlačidlo nefunguje, skopírujte a vložte nasledujúci odkaz do
            vášho prehliadača:
          </Text>

          <Text style={linkContainer}>
            <Link href={props.inviteLink} style={link}>
              {props.inviteLink}
            </Link>
          </Text>

          <Text style={textSecondary}>
            Toto pozvanie vyprší o 3 dní z bezpečnostných dôvodov.
          </Text>

          <Hr style={divider} />

          <Text style={textMuted}>
            Ak túto pozvánku nečakáte alebo ak sa nechcete pripojiť k
            organizácii {props.teamName}, môžete tento e-mail bezpečne
            ignorovať.
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>© 2026 Evidio. Všetky práva vyhradené.</Text>

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

export default OrganizationInvitationEmail;

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

const footerTextSmall = {
  color: "#9ca3af",
  fontSize: "12px",
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
