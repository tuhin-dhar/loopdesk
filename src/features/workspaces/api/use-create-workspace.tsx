import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<(typeof client.api.workspace)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspace)["$post"]>;

export const useCreateWorkspace = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.workspace.$post({ form });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    },
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Workspace Created!",
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
    onError: () => {
      toast({
        title: "Failed to create workspace",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
