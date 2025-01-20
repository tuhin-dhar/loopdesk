import { z } from "zod";

export const createProjectFormSchema = z.object({
  name: z.string().trim().min(1, "This is field is required"),
  imageUrl: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  workspaceId: z.string(),
});

export const updateProjectScehma = z.object({
  name: z.string().trim().min(1, "This field is required").optional(),
  imageUrl: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
