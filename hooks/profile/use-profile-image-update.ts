"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.profile)["image"]["$post"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.profile)["image"]["$post"]
>;

const useProfileImageUpdate = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.profile["image"].$post({
        form,
      });

      return await res.json();
    },
    onSuccess: () => {
      toast.success(`Profile updated successfully!`);
    },
    onError: () => {
      toast.error("Failed to update profile, please try again.");
    },
  });

  return mutation;
};

export default useProfileImageUpdate;
