import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/get-userid";
import { ProjectCreateRequestSchema } from "@/lib/zod";
import prisma from "@/lib/db";
import { sendError, sendSuccess } from "@/lib/apiResponse";

export async function POST(request: NextRequest) {
  try {
    const { projectName, description } = ProjectCreateRequestSchema.parse(
      await request.json()
    );
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
        return sendError({
            message: "Unauthenticated",
            status: 401,
            error: "User ID not found",
        });
    }

    // Verify user exists in database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return sendError({
        message: "User not found in database",
        status: 404,
        error: "Please sign out and sign in again",
      });
    }

    const project = await prisma.project.create({
      data: {
        ProjectName: projectName,
        userId: userId,
        description: description,
      },
    });

    return sendSuccess({
      message: "Project created successfully",
      status: 201,
      data: { project },
    });
  } catch (error) {
    return sendError({
      message: "Failed to create project",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
