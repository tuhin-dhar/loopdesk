import { Task } from "@/features/members/types";
import React from "react";
import { Button } from "./ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import DottedSeparator from "./DottedSeparator";
import OverviewProperty from "./OverviewProperty";
import MemberAvatar from "@/features/members/components/MemberAvatar";
import TaskDate from "@/features/tasks/components/TaskDate";
import StatusBadge from "@/features/tasks/components/StatusBadge";
import { useEditTaskModal } from "@/features/tasks/hook/use-edit-task-modal";

type Props = {
  task: Task;
};

const TaskOverview = ({ task }: Props) => {
  const { open } = useEditTaskModal();

  return (
    <div className="bg-muted flex flex-col gap-y-4 col-span-1">
      <div className="rounded-lg p-4">
        <div className="flex fle items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button
            onClick={() => open(task.$id)}
            size={"sm"}
            variant={"secondary"}
          >
            <Pencil1Icon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.asignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.asignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <StatusBadge value={task.status} className="text-sm font-medium" />
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
