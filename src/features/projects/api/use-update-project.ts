import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$patch"]
>;

export const useUpdateProject = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.projects[":projectId"].$patch({
        form,
        param,
      });
      if (!response.ok) {
        throw new Error("Failed to update project");
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
        queryKey: ["projects", data.workspaceId],
      });
    },
    onError: () => {
      toast({
        title: "Failed to update project",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
