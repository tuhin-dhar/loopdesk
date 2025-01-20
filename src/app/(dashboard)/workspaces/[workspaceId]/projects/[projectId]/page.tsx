import { getCurrent } from "@/features/auth/actions";
import { getProject } from "@/features/projects/actions";
import { redirect } from "next/navigation";
import React from "react";
import ProjectPageClient from "./client";

type Props = {
  params: Promise<{ workspaceId: string; projectId: string }>;
};

const ProjectIdPage = async ({ params }: Props) => {
  const user = await getCurrent();

  const { projectId, workspaceId } = await params;

  if (!user) redirect("/sign-in");

  const initialValues = await getProject({ projectId, workspaceId });

  if (!initialValues) throw new Error("Project not found");

  return <ProjectPageClient />;
};

export default ProjectIdPage;
