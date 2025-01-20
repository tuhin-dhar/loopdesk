"use client";

import { useQueryState, parseAsBoolean, parseAsString } from "nuqs";
import { TaskStatus } from "../types";

const useCreateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const [taskStatus, setTaskStatus] = useQueryState(
    "taskStatus",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const setStatus = (status: TaskStatus) => setTaskStatus(status);

  return {
    isOpen,
    setIsOpen,
    open,
    close,
    setStatus,
    taskStatus,
  };
};

export default useCreateTaskModal;
