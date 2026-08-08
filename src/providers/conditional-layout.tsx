"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { PublicSession } from "@/types/auth";
import { usePathname } from "next/navigation";

interface ConditionalLayoutProps {
  children: React.ReactNode;
  publicSession: PublicSession | null;
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
