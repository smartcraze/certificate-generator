import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendError, sendSuccess } from "@/lib/apiResponse";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return sendError({
        message: "Unauthorized",
        status: 401,
        error: "You must be logged in to view projects",
      });
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        _count: {
          select: {
            templates: true,
            generatedCertificates: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return sendSuccess({
      message: "Projects fetched successfully",
      status: 200,
      data: { projects },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return sendError({
      message: "Failed to fetch projects",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
