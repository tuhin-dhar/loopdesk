import { Task } from "@/features/members/types";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import DottedSeparator from "./DottedSeparator";
import { useUpdateTask } from "@/features/tasks/api/use-update-tasks";
import { XIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";

type Props = {
  task: Task;
};

const TaskDescription = ({ task }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState(task.description);
  const { mutate: updateTask, isPending } = useUpdateTask();

  const handleSave = () => {
    updateTask(
      { json: { description: value }, param: { taskId: task.$id } },
      {
        onSuccess: () => {
          setIsEditing((prev) => !prev);
        },
      }
    );
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">OverView</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size={"sm"}
          variant={"secondary"}
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <Pencil1Icon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            size={"sm"}
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div className="">
          {task.description || (
            <span className="text-muted-foreground"> No description set</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
