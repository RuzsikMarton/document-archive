"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PublicSession } from "@/types/auth";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  session: PublicSession | null;
}

const ConditionalLayout = ({ children, session }: ConditionalLayoutProps) => {
  const pathname = usePathname();

  // Hide header and footer on these routes
  const hideLayout =
    pathname.includes("/signin") || pathname.includes("/signup");

  return (
    <>
      {!hideLayout && <Header session={session} />}
      <div role="main" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default ConditionalLayout;
