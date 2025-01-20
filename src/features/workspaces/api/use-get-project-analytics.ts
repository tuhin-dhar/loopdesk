import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type Props = {
  workspaceId: string;
};

export type workspaceAnalyticsResponseType = InferResponseType<
  (typeof client.api.workspace)[":workspaceId"]["analytics"]["$get"],
  200
>;

export const useGetWorkspaceAnalytics = ({ workspaceId }: Props) => {
  const query = useQuery({
    queryKey: ["workspaceAnalytics", workspaceId],
    queryFn: async () => {
      const response = await client.api.workspace[":workspaceId"]["analytics"][
        "$get"
      ]({
        param: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Error fetching workspace analytics");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
