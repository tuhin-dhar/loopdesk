import { Models } from "node-appwrite";
import { TaskStatus } from "../tasks/types";

export enum MemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type Task = Models.Document & {
  name: string;
  asigneeId: string;
  projectId: string;
  position: number;
  dueDate: string;
  status: TaskStatus;
  workspaceId: string;
  description?: string;
};

export type Member = Models.Document & {
  workspaceId: string;
  userId: string;
  role: MemberRole;
};
