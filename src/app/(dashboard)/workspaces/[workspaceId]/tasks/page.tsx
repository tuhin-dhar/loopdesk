import { getCurrent } from "@/features/auth/actions";
import TaskViewSwitcher from "@/features/tasks/components/TaskViewSwitcher";
import { redirect } from "next/navigation";
import React from "react";

const TaskPage = async () => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="h-full flex flex-col">
      <TaskViewSwitcher />
    </div>
  );
};

export default TaskPage;
