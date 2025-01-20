import { useToast } from "@/hooks/use-toast";
import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$patch"],
  200
>;
type ReqestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$patch"]
>;

export const useUpdateMember = () => {
  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, ReqestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[":memberId"]["$patch"]({
        param,
        json,
      });
      if (!response.ok) {
        throw new Error("Error updating member");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Member updated!",
        className: "bg-green-500",
      });
      window.location.reload();
    },
    onError: () => {
      toast({
        title: "Failed to update member",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
