import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>;
type ReqestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;

export const useDeleteProject = () => {
  const queryClient = new QueryClient();
  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({
        param,
      });
      if (!response.ok) {
        throw new Error("Error deleting project");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        title: "Project Deleted!",
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.$id],
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete project",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
