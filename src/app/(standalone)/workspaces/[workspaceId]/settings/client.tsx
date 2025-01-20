"use client";

import PageError from "@/components/PageError";
import PageLoader from "@/components/PageLoader";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import EditWorkspaceForm from "@/features/workspaces/components/EditWorkspaceForm";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import React from "react";

const WorkspaceSettingClient = () => {
  const workspaceId = useWorkspaceId();

  const { data: initialValues, isLoading } = useGetWorkspace(workspaceId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialValues) {
    return <PageError />;
  }

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceSettingClient;
