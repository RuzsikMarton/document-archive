import SiteHeader from "@/components/layout/site-header";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" min-h-screen md:min-h-[calc(100vh-2rem)] bg-gradient-to-br from-background to-muted md:rounded-xl">
      <SiteHeader />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="max-w-md w-full px-6 text-center space-y-8">
          {/* Large 404 number */}
          <div className="relative">
            <h1 className="text-9xl font-bold bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl -z-10" />
          </div>

          {/* Error message */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              Stránka nenájdená
            </h2>
            <p className="text-muted-foreground text-base">
              Stránka, ktorú hľadáte, neexistuje alebo bola presunutá.
            </p>
          </div>

          {/* Action button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2"
          >
            Späť domov
          </Link>

          {/* Decorative elements */}
          <div className="flex justify-center gap-2 pt-4">
            <div className="h-1 w-8 rounded-full bg-primary/60" />
            <div className="h-1 w-12 rounded-full bg-primary/40" />
            <div className="h-1 w-8 rounded-full bg-primary/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
