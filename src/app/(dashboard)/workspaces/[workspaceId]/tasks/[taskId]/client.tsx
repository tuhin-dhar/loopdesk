"use client";

import ErrorPage from "@/app/error";
import DottedSeparator from "@/components/DottedSeparator";
import PageLoader from "@/components/PageLoader";
import TaskBreadCrumbs from "@/components/TaskBreadCrumbs";
import TaskDescription from "@/components/TaskDescription";
import TaskOverview from "@/components/TaskOverview";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useTaskId } from "@/features/tasks/hook/use-task-id";
import React from "react";

const TaskIdClient = () => {
  const taskId = useTaskId();

  const { data, isLoading } = useGetTask({ taskId });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!data) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col">
      <TaskBreadCrumbs project={data.project} task={data} />
      <DottedSeparator className="my-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskOverview task={data} />
        <TaskDescription task={data} />
      </div>
    </div>
  );
};

export default TaskIdClient;
