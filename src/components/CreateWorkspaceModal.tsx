"use client";

import React from "react";
import ResponsiveModal from "./ResponsiveModal";
import CreateWorkspaceForm from "@/features/workspaces/components/CreateWorkspaceForm";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

const CreateWorkspaceModal = () => {
  const { close, isOpen, setIsOpen } = useCreateWorkspaceModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </ResponsiveModal>
  );
};

export default CreateWorkspaceModal;
