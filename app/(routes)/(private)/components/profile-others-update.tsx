"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import useProfileNameOrBioUpdate from "@/hooks/profile/use-profile-name-or-bio-update";
import { Input } from "@/components/ui/input";

const profileOtherSchema = z.object({
  name: z.string().min(3).max(20).optional(),
  bio: z.string().min(3).max(100).optional(),
});

type ProfileOtherSchema = z.infer<typeof profileOtherSchema>;

const ProfileOthersUpdate = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { mutate: updateProfileNameOrBio, isPending: isUpdating } =
    useProfileNameOrBioUpdate();

  const form = useForm<ProfileOtherSchema>({
    resolver: zodResolver(profileOtherSchema),
    defaultValues: {
      name: user?.displayName ?? "",
      bio: user?.bio ?? "",
    },
  });

  const onSubmit = async (values: ProfileOtherSchema) => {
    updateProfileNameOrBio(
      {
        query: {
          name: values.name,
          bio: values.bio,
        },
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          form.reset();
          router.refresh();
        },
        onError: () => {
          toast.error("Failed to update profile. Please try again.");
        },
      },
    );
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isUpdating}
                      placeholder="delta"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isUpdating}
                      placeholder="I am a software engineer."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your bio. It will be displayed on your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardHeader>
          <CardFooter>
            <Button type="submit" disabled={isUpdating} className="mt-4 w-full">
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ProfileOthersUpdate;
