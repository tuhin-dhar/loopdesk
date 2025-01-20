import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$delete"],
  200
>;
type ReqestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$delete"]
>;

export const useDeleteMember = () => {
  const queryClient = new QueryClient();
  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[":memberId"]["$delete"]({
        param,
      });
      if (!response.ok) {
        throw new Error("Error deleting member");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Member Deleted!",
        className: "bg-green-500",
      });
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete member",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
