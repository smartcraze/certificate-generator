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
        error: "You must be logged in to view templates",
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

    const templates = await prisma.template.findMany({
      where: {
        projectId: id,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return sendSuccess({
      message: "Templates fetched successfully",
      status: 200,
      data: { templates },
    });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return sendError({
      message: "Failed to fetch templates",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function POST(
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
        error: "You must be logged in to create templates",
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
        error: "Project does not exist or you don't have permission to create templates in it",
      });
    }

    const body = await request.json();
    const { name, fileUrl, configJSON } = body;

    if (!name || !fileUrl) {
      return sendError({
        message: "Validation failed",
        status: 400,
        error: "Template name and file URL are required",
      });
    }

    const template = await prisma.template.create({
      data: {
        projectId: id,
        name,
        fileUrl,
        configJSON: configJSON || '{}',
      },
    });

    return sendSuccess({
      message: "Template created successfully",
      status: 201,
      data: { template },
    });
  } catch (error) {
    console.error("Error creating template:", error);
    return sendError({
      message: "Failed to create template",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
