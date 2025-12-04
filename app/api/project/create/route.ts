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

    await prisma.project.create({
      data: {
        ProjectName: projectName,
        userId: userId,
        description: description,
      },
    });

    return sendSuccess({
      message: "Project created successfully",
      status: 201,
      data: null,
    });
  } catch (error) {
    return sendError({
      message: "Failed to create project",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
