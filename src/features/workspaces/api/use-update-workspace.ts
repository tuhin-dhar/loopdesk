import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.workspace)[":workspaceId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.workspace)[":workspaceId"]["$patch"]
>;

export const useUpdateWorkspace = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspace[":workspaceId"].$patch({
        form,
        param,
      });
      if (!response.ok) {
        throw new Error("Failed to update workspace");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        title: " Changes saved!",
        description: `${data.name} successfully updated!`,
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
        title: "Failed to update workspace",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
