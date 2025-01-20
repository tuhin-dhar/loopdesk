"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useCallback } from "react";
import { IoMdAddCircle } from "react-icons/io";
import useCreateTaskModal from "../hook/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { useQueryState } from "nuqs";
import { Loader } from "lucide-react";
import DataFilters from "./DataFilters";
import useTaskFilter from "../hook/use-task-filter";
import { DataTable } from "@/features/tasks/components/DataTable";
import { columns } from "@/features/tasks/components/columns";
import DataKanban from "./DataKanban";
import { TaskStatus } from "../types";
import { useBulkUpdateTask } from "../api/use-bulk-update-tasks";
import DataCalendar from "./DataCalendar";
import useProjectId from "@/hooks/use-project-id";

type Props = {
  hideProjectFilter?: boolean;
};

const TaskViewSwitcher = ({ hideProjectFilter }: Props) => {
  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const [{ asigneeId, dueDate, projectId, search, status }] = useTaskFilter();

  const workspaceId = useWorkspaceId();
  const paramProjectId = useProjectId();
  const { mutate: bulkUpdate } = useBulkUpdateTask();

  const { open } = useCreateTaskModal();
  const { data: tasks, isLoading: isFetchingTasks } = useGetTasks({
    workspaceId: workspaceId,
    asigneeId: asigneeId,
    dueDate: dueDate,
    projectId: paramProjectId || projectId,
    search: search,
    status: status,
  });

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: {
          tasks,
        },
      });
    },
    [bulkUpdate]
  );

  return (
    <Tabs
      className="flex-1 w-full border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto text-primary gap-3">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              KanBan
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button onClick={open} size={"sm"} className="w-full lg:w-auto">
            <IoMdAddCircle />
            New Task
          </Button>
        </div>
        <Separator className="my-4" />
        <DataFilters hideProjectFilter={hideProjectFilter} />
        <Separator className="my-4" />
        {isFetchingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0 h-full pb-4">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
