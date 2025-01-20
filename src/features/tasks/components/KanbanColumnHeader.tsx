import React from "react";
import { TaskStatus } from "../types";
import { snakeCaseToTitleCase } from "@/features/members/utils";
import { MdOutlineRateReview } from "react-icons/md";
import { RiProgress5Line, RiTodoLine } from "react-icons/ri";
import { FiAlertTriangle } from "react-icons/fi";
import { IoIosDoneAll } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import useCreateTaskModal from "../hook/use-create-task-modal";

type Props = {
  board: TaskStatus;
  taskCount: number;
};

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: <FiAlertTriangle className="size-[18px]" />,
  [TaskStatus.TODO]: <RiTodoLine className="size-[18px]" />,
  [TaskStatus.IN_PROGRESS]: <RiProgress5Line className="size-[18px]" />,
  [TaskStatus.IN_REVIEW]: <MdOutlineRateReview className="size-[18px]" />,
  [TaskStatus.DONE]: <IoIosDoneAll className="size-[18px]" />,
};

const KanbanColumnHeader = ({ board, taskCount }: Props) => {
  const icon = statusIconMap[board];

  const { open, setStatus } = useCreateTaskModal();

  return (
    <div className="px-2 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2>{snakeCaseToTitleCase(board)}</h2>
        <div className="size-5 flex justify-center items-center rounded-sm bg-neutral-200 text-xs text-neutral-700 font-medium">
          {taskCount}
        </div>
      </div>
      <Button
        onClick={() => {
          open();
          setStatus(board);
        }}
        variant={"ghost"}
        size={"icon"}
      >
        <PlusIcon className="size-4 text-neutral-500 " />
      </Button>
    </div>
  );
};

export default KanbanColumnHeader;
