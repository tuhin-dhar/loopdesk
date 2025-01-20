import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TaskStatus } from "../types";
import { snakeCaseToTitleCase } from "@/features/members/utils";

type Props = {
  value: TaskStatus;
  className?: string;
};

const StatusBadge = ({ value, className }: Props) => {
  let textColor = "";
  if (value === TaskStatus.BACKLOG) {
    textColor = "bg-red-500";
  } else if (value === TaskStatus.TODO) {
    textColor = "bg-blue-700";
  } else if (value === TaskStatus.IN_PROGRESS) {
    textColor = "bg-green-500";
  } else if (value === TaskStatus.DONE) {
    textColor = "bg-green-900";
  } else if (value === TaskStatus.IN_REVIEW) {
    textColor = "bg-yellow-500";
  }

  return (
    <Badge className={textColor}>
      <span className={cn("truncate", className)}>
        {snakeCaseToTitleCase(value)}
      </span>
    </Badge>
  );
};

export default StatusBadge;
