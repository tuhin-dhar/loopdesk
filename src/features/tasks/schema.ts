import { z } from "zod";
import { TaskStatus } from "./types";

export const CreateTaskFormSchema = z.object({
  name: z.string().trim().min(1, "This field is required"),
  status: z.nativeEnum(TaskStatus, {
    required_error: "This field is required",
  }),
  workspaceId: z.string().trim().min(1, "This is field is required"),
  projectId: z.string().trim().min(1, "This is field is required"),
  dueDate: z.coerce.date(),
  asigneeId: z.string().trim().min(1, "This is field is required"),
  description: z.string().optional(),
});
