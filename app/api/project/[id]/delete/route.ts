import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendError, sendSuccess } from "@/lib/apiResponse";

export async function DELETE(
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
        error: "You must be logged in to delete projects",
      });
    }

    // Verify project exists and belongs to user
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
        error: "Project does not exist or you don't have permission to delete it",
      });
    }

    // Delete project (cascade will delete related templates, datasets, certificates)
    await prisma.project.delete({
      where: { id },
    });

    return sendSuccess({
      message: "Project deleted successfully",
      status: 200,
      data: { projectId: id },
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return sendError({
      message: "Failed to delete project",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
