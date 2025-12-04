import { z } from "zod";

export const ProjectCreateRequestSchema = z.object({
  projectName: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
});

export type ProjectCreateRequest = z.infer<typeof ProjectCreateRequestSchema>;