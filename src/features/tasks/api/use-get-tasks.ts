import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { TaskStatus } from "../types";

type Props = {
  workspaceId: string;
  asigneeId?: string | null;
  dueDate?: string | null;
  projectId?: string | null;
  search?: string | null;
  status?: TaskStatus | null;
};

export const useGetTasks = ({
  asigneeId,
  dueDate,
  projectId,
  search,
  status,
  workspaceId,
}: Props) => {
  const query = useQuery({
    queryKey: ["tasks", workspaceId, projectId, status, asigneeId, dueDate],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          workspaceId: workspaceId,
          asigneeId: asigneeId ?? undefined,
          dueDate: dueDate ?? undefined,
          projectId: projectId ?? undefined,
          search: search ?? undefined,
          status: status ?? undefined,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching tasks");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
