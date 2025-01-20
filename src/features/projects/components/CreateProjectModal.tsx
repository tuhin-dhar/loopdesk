"use client";

import React from "react";
import ResponsiveModal from "@/components/ResponsiveModal";
import CreateProjectForm from "./CreateProjectForm";
import useCreateProjectModal from "../hook/use-create-project-modal";

const CreateProjectModal = () => {
  const { close, isOpen, setIsOpen } = useCreateProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateProjectModal;
