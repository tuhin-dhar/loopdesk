import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.login.$post({ json });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return await res.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["current", "workspaces"],
      });
    },
  });

  return mutation;
};
