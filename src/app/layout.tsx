import { auth } from "@/lib/auth";
import "./globals.css";
import { headers } from "next/headers";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { Providers } from "@/providers/providers";

export async function generateMetadata() {
  const title = "Evidio";
  const description = "Evidio";
  return {
    title,
    description,
    creator: "Marton Ruzsik",
    icons: {
      icon: [
        {
          url: "/favicon.ico",
          sizes: "any",
        },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
        },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

async function LayoutContent({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const publicSession = session
    ? {
        user: {
          id: session.user.id,
          name: session.user.name,
        },
        role: session.role,
      }
    : null;

  return (
    <Suspense
      fallback={
        <div className="">
          <div className="flex flex-col items-center justify-center space-y-4">
            <LoaderCircle className="animate-spin" size={48} />
          </div>
        </div>
      }
    >
      <Providers session={publicSession}>{children}</Providers>
    </Suspense>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className="scroll-smooth relative"
    >
      <body className={`font-inter min-h-full antialiased`}>
        {" "}
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
