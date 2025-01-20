import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { TaskStatus } from "../types";

const useTaskFilter = () => {
  return useQueryStates({
    projectId: parseAsString,
    status: parseAsStringEnum(Object.values(TaskStatus)),
    asigneeId: parseAsString,
    search: parseAsString,
    dueDate: parseAsString,
  });
};

export default useTaskFilter;
