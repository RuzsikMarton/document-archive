import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { Providers } from "@/providers/providers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

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
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/dark-favicon.ico",
          sizes: "any",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/favicon-32x32.png",
          sizes: "32x32",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/dark-favicon-32x32.png",
          sizes: "32x32",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/favicon-16x16.png",
          sizes: "16x16",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/dark-favicon-16x16.png",
          sizes: "16x16",
          media: "(prefers-color-scheme: dark)",
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
      <Providers publicSession={publicSession}>{children}</Providers>
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
      className={`${inter.className} scroll-smooth relative`}
    >
      <body className="min-h-full antialiased">
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
