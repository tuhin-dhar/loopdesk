import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type Props = {
  workspaceId: string;
};

export const useGetMembers = ({ workspaceId }: Props) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async ({}) => {
      const response = await client.api.members.$get({
        query: { workspaceId: workspaceId },
      });
      if (!response.ok) {
        throw new Error("Error fetching members");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
