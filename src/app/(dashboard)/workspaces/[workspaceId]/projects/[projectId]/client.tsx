"use client";

import Analytics from "@/components/Analytics";
import PageError from "@/components/PageError";
import PageLoader from "@/components/PageLoader";
import { Button } from "@/components/ui/button";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics";
import ProjectAvatar from "@/features/projects/components/ProjectAvatar";
import TaskViewSwitcher from "@/features/tasks/components/TaskViewSwitcher";
import useProjectId from "@/hooks/use-project-id";
import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

const ProjectPageClient = () => {
  const projectId = useProjectId();

  const { data: project, isLoading: isDataLoading } = useGetProject(projectId);
  const { data: projectAnalytics, isLoading: isAnalyticsLoading } =
    useGetProjectAnalytics({ projectId });

  if (isDataLoading || isAnalyticsLoading) {
    return <PageLoader />;
  }

  if (!project) {
    return <PageError />;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={project?.name}
            image={project.imageUrl}
            className="size-10"
          />
          <p className="text-lg font-semibold">{project.name}</p>
        </div>
        <div className="">
          <Button variant={"secondary"} size={"sm"} asChild>
            <Link
              href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
            >
              <FaRegEdit /> Edit Project
            </Link>
          </Button>
        </div>
      </div>

      {projectAnalytics ? <Analytics data={projectAnalytics} /> : null}
      <TaskViewSwitcher hideProjectFilter={true} />
    </div>
  );
};

export default ProjectPageClient;
