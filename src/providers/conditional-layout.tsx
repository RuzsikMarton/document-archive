"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  publicSession: any;
}

const ConditionalLayout = ({
  children,
  publicSession,
}: ConditionalLayoutProps) => {
  const pathname = usePathname();

  // Hide header and footer on these routes
  const hideLayout =
    pathname.includes("/signin") || pathname.includes("/signup");

  return (
    <>
      {!hideLayout && <Header publicSession={publicSession} />}
      <div role="main" tabIndex={-1}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default ConditionalLayout;
