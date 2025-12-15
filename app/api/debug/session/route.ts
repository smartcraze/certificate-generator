import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ 
        error: "Not authenticated",
        session: session 
      }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    return NextResponse.json({ 
      session,
      userExists: !!user,
      user: user ? { id: user.id, email: user.email, name: user.name } : null
    });
  } catch (error) {
    console.error("Error checking session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
