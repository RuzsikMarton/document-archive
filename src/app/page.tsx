import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Hello, world! This is Evidio.</h1>
      <ThemeToggle />
    </main>
  );
}
