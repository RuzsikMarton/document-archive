import { Loader2 } from "lucide-react";

const LoadingSettings = () => {
  return (
    <main className="container max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="animate-spin size-8 text-muted-foreground" />
      </div>
    </main>
  );
};

export default LoadingSettings;
