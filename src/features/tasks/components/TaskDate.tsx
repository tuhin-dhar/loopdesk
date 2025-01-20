import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";

type Props = {
  value: string;
  className?: string;
};

const TaskDate = ({ value, className }: Props) => {
  const today = new Date();
  const endDate = new Date(value);
  const diffInDays = differenceInDays(endDate, today);

  let textColor = "bg-green-500";
  if (diffInDays <= 3) {
    textColor = "bg-red-500";
  } else if (diffInDays <= 7) {
    textColor = "bg-orange-700";
  } else if (diffInDays <= 14) {
    textColor = "bg-yellow-500";
  }

  return (
    <Badge className={cn(className, textColor)}>
      <span className={cn("truncate", className)}>{format(value, "PPP")}</span>
    </Badge>
  );
};

export default TaskDate;
