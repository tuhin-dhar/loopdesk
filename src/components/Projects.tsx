"use client";

import { IoMdAddCircle } from "react-icons/io";

import React from "react";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import useCreateProjectModal from "@/features/projects/hook/use-create-project-modal";

import ProjectAvatar from "@/features/projects/components/ProjectAvatar";

const Projects = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const { open } = useCreateProjectModal();

  const { data } = useGetProjects(workspaceId);
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-primary font-bold">Projects</p>
        <IoMdAddCircle onClick={open} className="size-5 text-primary" />
      </div>
      {data?.documents.map((project) => {
        const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-black transition text-primary",
                isActive && "bg-primary text-muted shadow-sm hover:opacity-100"
              )}
            >
              <ProjectAvatar name={project.name} image={project.imageUrl} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Projects;
