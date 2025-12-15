import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendError, sendSuccess } from "@/lib/apiResponse";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; templateId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id, templateId } = await params;

    if (!session?.user?.id) {
      return sendError({
        message: "Unauthorized",
        status: 401,
        error: "You must be logged in to view templates",
      });
    }

    const template = await prisma.template.findFirst({
      where: {
        id: templateId,
        project: {
          id,
          userId: session.user.id,
        },
      },
    });

    if (!template) {
      return sendError({
        message: "Template not found",
        status: 404,
        error: "Template does not exist or you don't have permission to view it",
      });
    }

    return sendSuccess({
      message: "Template fetched successfully",
      status: 200,
      data: { template },
    });
  } catch (error) {
    console.error("Error fetching template:", error);
    return sendError({
      message: "Failed to fetch template",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; templateId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id, templateId } = await params;

    if (!session?.user?.id) {
      return sendError({
        message: "Unauthorized",
        status: 401,
        error: "You must be logged in to update templates",
      });
    }

    const template = await prisma.template.findFirst({
      where: {
        id: templateId,
        project: {
          id,
          userId: session.user.id,
        },
      },
    });

    if (!template) {
      return sendError({
        message: "Template not found",
        status: 404,
        error: "Template does not exist or you don't have permission to update it",
      });
    }

    const body = await request.json();
    const { name, configJSON, fileUrl } = body;

    const updatedTemplate = await prisma.template.update({
      where: { id: templateId },
      data: {
        ...(name && { name }),
        ...(configJSON && { configJSON }),
        ...(fileUrl && { fileUrl }),
      },
    });

    return sendSuccess({
      message: "Template updated successfully",
      status: 200,
      data: { template: updatedTemplate },
    });
  } catch (error) {
    console.error("Error updating template:", error);
    return sendError({
      message: "Failed to update template",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; templateId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { id, templateId } = await params;

    if (!session?.user?.id) {
      return sendError({
        message: "Unauthorized",
        status: 401,
        error: "You must be logged in to delete templates",
      });
    }

    const template = await prisma.template.findFirst({
      where: {
        id: templateId,
        project: {
          id,
          userId: session.user.id,
        },
      },
    });

    if (!template) {
      return sendError({
        message: "Template not found",
        status: 404,
        error: "Template does not exist or you don't have permission to delete it",
      });
    }

    await prisma.template.delete({
      where: { id: templateId },
    });

    return sendSuccess({
      message: "Template deleted successfully",
      status: 200,
      data: { templateId },
    });
  } catch (error) {
    console.error("Error deleting template:", error);
    return sendError({
      message: "Failed to delete template",
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
