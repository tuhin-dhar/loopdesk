import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type Props = {
  taskId: string;
};

export const useGetTask = ({ taskId }: Props) => {
  console.log("here");
  const query = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"]["$get"]({
        param: { taskId },
      });
      if (!response.ok) {
        throw new Error("Error fetching task");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
