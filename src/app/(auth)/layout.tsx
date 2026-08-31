import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <LoaderCircle className="animate-spin" size={48} />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
