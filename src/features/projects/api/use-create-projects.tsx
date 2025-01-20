import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useToast } from "@/hooks/use-toast";

type ResponseType = InferResponseType<
  (typeof client.api.projects)["$post"],
  200
>;
type RequestType = InferRequestType<(typeof client.api.projects)["$post"]>;

export const useCreateProject = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.projects.$post({ form });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast({
        title: "Project Created!",
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({
        queryKey: ["projects", data.workspaceId],
      });
    },
    onError: () => {
      toast({
        title: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
