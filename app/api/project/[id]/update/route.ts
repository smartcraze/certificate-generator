import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendError, sendSuccess } from "@/lib/apiResponse";

export async function PATCH(
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
        error: "You must be logged in to update projects",
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
        error: "Project does not exist or you don't have permission to update it",
      });
    }

    const body = await request.json();
    const { projectName, description } = body;

    if (!projectName || projectName.trim() === '') {
      return sendError({
        message: "Validation failed",
        status: 400,
        error: "Project name is required",
      });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ProjectName: projectName,
        description: description || null,
      },
    });

    return sendSuccess({
      message: "Project updated successfully",
      status: 200,
      data: { project: updatedProject },
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return sendError({
      message: "Failed to update project",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
