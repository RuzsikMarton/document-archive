import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/utils/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invitationId: string }>;
  },
) {
  const { invitationId } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: {
      id: invitationId,
    },
  });

  if (
    !invitation ||
    invitation.status !== "pending" ||
    invitation.expiresAt < new Date()
  ) {
    return NextResponse.json(
      {
        success: false,
        message: "Pozvánka nie je platná alebo jej platnosť vypršala.",
      },
      { status: 400 },
    );
  }

  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Musíte byť prihlásený.",
      },
      { status: 401 },
    );
  }

  if (session.user.email !== invitation.email) {
    return NextResponse.json(
      {
        success: false,
        message: "Táto pozvánka nie je určená pre tento účet.",
      },
      { status: 403 },
    );
  }

  if (session.user.emailVerified === false) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Musíte si overiť svoj e-mail, aby ste mohli prijať pozvánku do organizácie.",
      },
      { status: 403 },
    );
  }

  {
    /* IF ONLY ONE ORGANIZATION PER USER 
  // IMPORTANT:
  // User can belong to only ONE organization
  const existingMember = await prisma.member.findFirst({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      organizationId: true,
    },
  });

  if (existingMember) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Už ste členom inej organizácie a túto pozvánku nemôžete prijať.",
      },
      { status: 409 },
    );
  }}*/
  }

  try {
    await auth.api.acceptInvitation({
      body: {
        invitationId,
      },
      headers: await headers(),
    });

    return NextResponse.json({
      success: true,
      message: "Pozvánka bola úspešne prijatá.",
    });
  } catch (error) {
    console.error("Error accepting invitation:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Nepodarilo sa prijať pozvánku.",
      },
      { status: 500 },
    );
  }
}
