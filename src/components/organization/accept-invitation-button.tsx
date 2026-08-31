"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AcceptInvitationButton({
  invitationId,
}: {
  invitationId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const acceptInvitation = async () => {
    setLoading(true);

    const response = await fetch(`/api/accept-invitation/${invitationId}`, {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Nepodarilo sa prijať pozvánku.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <Button onClick={acceptInvitation} disabled={loading} className="w-full">
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <CheckCircle2 className="mr-2 h-4 w-4" />
      )}
      Prijať pozvánku
    </Button>
  );
}
