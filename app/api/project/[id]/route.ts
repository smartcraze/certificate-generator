import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendError, sendSuccess } from "@/lib/apiResponse";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session?.user?.id) {
      return sendError({
        message: "Unauthorized",
        status: 401,
        error: "You must be logged in to view projects",
      });
    }

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!project) {
      return sendError({
        message: "Project not found",
        status: 404,
        error: "Project does not exist or you don't have permission to view it",
      });
    }

    return sendSuccess({
      message: "Project fetched successfully",
      status: 200,
      data: { project },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return sendError({
      message: "Failed to fetch project",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
