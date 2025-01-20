"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { Loader2 } from "lucide-react";
import React from "react";
import { useGetTask } from "../api/use-get-task";
import EditTaskForm from "./EditTaskForm";

type Props = {
  onCancel?: () => void;
  taskId: string;
};

const EditTaskFormWrapper = ({ onCancel, taskId }: Props) => {
  const workspaceId = useWorkspaceId();

  const { data: initialValues, isLoading: isGetTaskLoading } = useGetTask({
    taskId,
  });

  const { data: projects, isLoading: isLoadingFetchingProjects } =
    useGetProjects(workspaceId);

  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId: workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading =
    isLoadingFetchingProjects || isLoadingMembers || isGetTaskLoading;

  if (isLoading) {
    return (
      <Card className="w-full h-[724px] shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader2 className="size-5 text-primary animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) return null;

  //   if (!memberOptions || !projectOptions) throw new Error("Error");

  return (
    <EditTaskForm
      memberOptions={memberOptions || []}
      projectOptions={projectOptions || []}
      onCancel={onCancel}
      initialValues={initialValues}
    />
  );
};

export default EditTaskFormWrapper;
