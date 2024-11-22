"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.auth.login.magic.$post>;
type ResponseType = InferResponseType<typeof client.api.auth.login.magic.$post>;

const useSendMagicLink = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.login.magic.$post({
        json,
      });

      return await res.json();
    },
    onSuccess: () => {
      toast.success(`Magic link sent, check your email`);
    },
    onError: () => {
      toast.error("Failed to sent magic link, please try again.");
    },
  });

  return mutation;
};

export default useSendMagicLink;
