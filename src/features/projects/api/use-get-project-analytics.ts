import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type Props = {
  projectId: string;
};

export type projectAnalyticsResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
  200
>;

export const useGetProjectAnalytics = ({ projectId }: Props) => {
  const query = useQuery({
    queryKey: ["projectAnalytics", projectId],
    queryFn: async () => {
      const response = await client.api.projects[":projectId"]["analytics"][
        "$get"
      ]({
        param: { projectId },
      });

      if (!response.ok) {
        throw new Error("Error fetching project analytics");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
