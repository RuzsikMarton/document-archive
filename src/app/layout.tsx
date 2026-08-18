import "./globals.css";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { Providers } from "@/providers/providers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AppSidebar from "@/components/layout/app-sidebar";

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

  const isSignedIn = !!session;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoaderCircle className="animate-spin" size={48} />
        </div>
      }
    >
      {isSignedIn ? (
        <>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar user={session.user} />
            <SidebarInset className="md:mr-4!">
              <main className="w-full"> {children}</main>
            </SidebarInset>
          </SidebarProvider>
        </>
      ) : (
        <>
          <Header />

          <main>{children}</main>
          <Footer />
        </>
      )}
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
        <Providers>
          <Toaster />
          <LayoutContent>{children}</LayoutContent>
        </Providers>
      </body>
    </html>
  );
}
