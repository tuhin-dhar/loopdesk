import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.workspace)[":workspaceId"]["join"]["$post"],
  200
>;
type ReqestType = InferRequestType<
  (typeof client.api.workspace)[":workspaceId"]["join"]["$post"]
>;

export const useJoinWorkspace = () => {
  const queryClient = new QueryClient();
  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.workspace[":workspaceId"]["join"][
        "$post"
      ]({
        param,
        json,
      });
      if (!response.ok) {
        throw new Error("Error joining workspace");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        title: "Workspace joined successfully!",
        description: `Joined ${data.name}`,
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.$id],
      });
    },
    onError: () => {
      toast({
        title: "Failed to join workspace",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
