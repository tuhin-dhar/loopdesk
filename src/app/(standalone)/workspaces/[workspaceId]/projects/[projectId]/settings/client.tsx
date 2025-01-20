"use client";

import PageError from "@/components/PageError";
import PageLoader from "@/components/PageLoader";
import { useGetProject } from "@/features/projects/api/use-get-project";
import EditProjectFrom from "@/features/projects/components/EditProjectForm";
import useProjectId from "@/hooks/use-project-id";
import React from "react";

const ProjectSettingClient = () => {
  const projectId = useProjectId();

  const { data: initialValues, isLoading } = useGetProject(projectId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialValues) {
    return <PageError />;
  }

  return (
    <div className="w-full lg:max-w-2xl">
      <EditProjectFrom initialValues={initialValues} />
    </div>
  );
};

export default ProjectSettingClient;
