import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ invitationId: string }> },
) {
  const { invitationId } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    include: { organization: true },
  });

  if (
    !invitation ||
    invitation.expiresAt < new Date() ||
    invitation.status !== "pending"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const session = await getSession();
  if (!session?.user || session.user.email !== invitation.email) {
    // User not logged in - redirect to signup/login
    return NextResponse.redirect(
      new URL(
        `/signup?inviteId=${invitationId}&email=${invitation?.email}`,
        request.url,
      ),
    );
  }

  try {
    const data = await auth.api.acceptInvitation({
      body: {
        invitationId,
      },
      headers: await headers(),
    });
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error accepting invitation:", error);
    return NextResponse.json(
      { error: "Failed to accept invitation." },
      { status: 500 },
    );
  }
}
