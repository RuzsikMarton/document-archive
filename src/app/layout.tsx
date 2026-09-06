import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
{
  /*
  Alternate font Jost
  const jost = Jost({
  subsets: ["latin"],
});*/
}

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
          {children}
        </Providers>
      </body>
    </html>
  );
}
