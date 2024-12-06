"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.newsletters.$post>;
type ResponseType = InferResponseType<typeof client.api.newsletters.$post>;

const useNewsLetter = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ query }) => {
      const res = await client.api.newsletters.$post({
        query,
      });

      return await res.json();
    },
    onSuccess: () => {
      toast.success(`Subscribed!`);
    },
    onError: () => {
      toast.error("Failed to subscribe, please try again later.");
    },
  });

  return mutation;
};

export default useNewsLetter;