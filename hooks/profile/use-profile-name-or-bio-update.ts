"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.profile)["name-or-bio"]["$post"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.profile)["name-or-bio"]["$post"]
>;

const useProfileNameOrBioUpdate = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ query }) => {
      const res = await client.api.profile["name-or-bio"].$post({
        query,
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

export default useProfileNameOrBioUpdate;
