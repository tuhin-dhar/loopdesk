import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.workspace)[":workspaceId"]["reset-invite-code"]["$post"],
  200
>;
type ReqestType = InferRequestType<
  (typeof client.api.workspace)[":workspaceId"]["reset-invite-code"]["$post"]
>;

export const useResetInviteCode = () => {
  const queryClient = new QueryClient();
  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspace[":workspaceId"][
        "reset-invite-code"
      ]["$post"]({
        param,
      });
      if (!response.ok) {
        throw new Error("Error reseting invite code");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast({
        title: "Invite code successfully reset",

        className: "bg-green-500",
      });

      queryClient.invalidateQueries({
        queryKey: ["workspace", data.$id],
      });
    },
    onError: () => {
      toast({
        title: "Failed to reset invite code",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
