import { toast } from "sonner";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";

type ResponseType = InferResponseType<typeof client.api.auth.logout.$get>;

export const useLogout = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.auth.logout.$get();

      if (!res.ok) {
        const errorData = (await res.json()) as { error: string };
        toast.error(errorData?.error);
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Logout successfully!");
      window.location.reload();
    },
  });

  return mutation;
};
