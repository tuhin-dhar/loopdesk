"use client";

import ResponsiveModal from "@/components/ResponsiveModal";
import React from "react";
import useCreateTaskModal from "../hook/use-create-task-modal";
import CreateTaskFormWrapper from "./CreateTaskFormWrapper";

const CreateTaskModal = () => {
  const { close, isOpen, setIsOpen } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateTaskModal;
