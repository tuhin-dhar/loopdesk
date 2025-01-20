import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";
import { useDeleteTask } from "../api/use-delete-task";
import { useConfirm } from "@/hooks/useConfirm";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { useEditTaskModal } from "../hook/use-edit-task-modal";

type Props = {
  id: string;
  projectId: string;
  children: React.ReactNode;
};

const TaskActions = ({ children, id, projectId }: Props) => {
  const [DeleteDialog, confirmDelete] = useConfirm({
    message: "Confirming will permanently delete the task",
    title: "Are you sure?",
    variant: "destructive",
  });

  const { open } = useEditTaskModal();

  const workspaceId = useWorkspaceId();

  const router = useRouter();

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteTask({ param: { taskId: id } });
  };

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <DeleteDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            className="font-medium p-[10px]"
          >
            <GoLinkExternal className="size-4 mr-2 stroke-2" /> Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            className="font-medium p-[10px]"
          >
            <GoLinkExternal className="size-4 mr-2 stroke-2" /> Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              open(id);
            }}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <FaRegEdit className="size-4 mr-2 stroke-2" /> Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isDeleting}
            className="font-medium p-[10px] text-amber-700 focus:text-amber-700"
          >
            <Trash2Icon className="size-4 mr-2 stroke-2" /> Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskActions;
