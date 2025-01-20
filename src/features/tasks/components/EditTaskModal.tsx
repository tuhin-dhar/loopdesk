"use client";

import React from "react";
import { useEditTaskModal } from "../hook/use-edit-task-modal";
import ResponsiveModal from "@/components/ResponsiveModal";
import EditTaskFormWrapper from "./EditTaskFormWrapper";

const EditTaskModal = () => {
  const { close, taskId } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper taskId={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};

export default EditTaskModal;
