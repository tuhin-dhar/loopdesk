"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import WorkspaceAvatar from "./WorkspaceAvatar";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspaces();

  const { open } = useCreateWorkspaceModal();

  const router = useRouter();

  const workspaceId = useWorkspaceId();

  const onselect = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-primary font-bold">Workspaces</p>
        <IoMdAddCircle onClick={open} className="size-5 text-primary" />
      </div>
      <Select onValueChange={onselect} value={workspaceId}>
        <SelectTrigger className="w-full font-medium p-1 h-15">
          <SelectValue
            className="text-muted"
            placeholder="No Workspace selected"
          />
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem value={workspace.$id} key={workspace.$id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <WorkspaceAvatar
                  name={workspace.name}
                  image={workspace.imageUrl}
                />
                <span className="turncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkspaceSwitcher;
