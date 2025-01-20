import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsListCheck } from "react-icons/bs";
import { TaskStatus } from "../types";
import { MdOutlineRateReview } from "react-icons/md";
import { RiProgress5Line, RiTodoLine } from "react-icons/ri";
import { FiAlertTriangle } from "react-icons/fi";
import { IoIosDoneAll } from "react-icons/io";
import useTaskFilter from "../hook/use-task-filter";
import { FiUsers } from "react-icons/fi";
import { GoProjectSymlink } from "react-icons/go";
import DatePicker from "@/components/DatePicker";

type Props = {
  hideProjectFilter?: boolean;
};

const DataFilters = ({ hideProjectFilter }: Props) => {
  const workspaceId = useWorkspaceId();

  const { data: projects, isLoading: isLoadingProjects } =
    useGetProjects(workspaceId);
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const isLoading = isLoadingMembers || isLoadingProjects;

  const projectOptions = projects?.documents.map((project) => ({
    value: project.$id,
    name: project.name,
  }));
  const memberOptions = members?.documents.map((member) => ({
    value: member.$id,
    name: member.name,
  }));

  const [{ asigneeId, dueDate, projectId, status }, setFilters] =
    useTaskFilter();

  const onStatusChange = (value: string) => {
    if (value === "all") {
      setFilters({ status: null });
    } else {
      setFilters({
        status: value as TaskStatus,
      });
    }
  };

  const onAsigneeIdChange = (value: string) => {
    if (value === "all") {
      setFilters({ asigneeId: null });
    } else {
      setFilters({ asigneeId: value as string });
    }
  };

  const onProjectIdChange = (value: string) => {
    if (value === "all") {
      setFilters({
        projectId: null,
      });
    } else {
      setFilters({
        projectId: value as string,
      });
    }
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      {/* status */}
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <BsListCheck className="size-4 mr-3" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value={TaskStatus.BACKLOG}>
            <div className="flex items-center gap-x-3 ">
              <FiAlertTriangle />
              Backlog
            </div>
          </SelectItem>
          <SelectItem value={TaskStatus.TODO}>
            <div className="flex items-center gap-x-3 ">
              <RiTodoLine />
              Todo
            </div>
          </SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>
            <div className="flex items-center gap-x-3">
              <RiProgress5Line />
              In progress
            </div>
          </SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>
            <div className="flex items-center gap-x-3 ">
              <MdOutlineRateReview />
              In review
            </div>
          </SelectItem>
          <SelectItem value={TaskStatus.DONE}>
            <div className="flex items-center gap-x-3">
              <IoIosDoneAll /> Done
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      {/* asignee */}
      <Select
        defaultValue={asigneeId ?? undefined}
        onValueChange={(value) => onAsigneeIdChange(value)}
      >
        <SelectTrigger className="w-full lg:w-auto h-8">
          <div className="flex items-center pr-2">
            <FiUsers className="size-4 mr-3" />
            <SelectValue placeholder="All asignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Asignees</SelectItem>
          {memberOptions?.map((member) => (
            <SelectItem key={member.value} value={member.value}>
              {member.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* projects */}
      {!hideProjectFilter && (
        <Select
          defaultValue={projectId ?? undefined}
          onValueChange={(value) => onProjectIdChange(value)}
        >
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              <GoProjectSymlink className="size-4 mr-3" />
              <SelectValue placeholder="All projects" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {projectOptions?.map((project) => (
              <SelectItem key={project.value} value={project.value}>
                <div className="flex items-center gap-x-3"></div>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <DatePicker
        className="h-8 w-full lg:w-auto bg-primary text-background hover:bg-primary hover:text-background"
        placeholder="Due date"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) =>
          setFilters({ dueDate: date ? date.toISOString() : null })
        }
      />
    </div>
  );
};

export default DataFilters;
