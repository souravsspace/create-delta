"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import useNewsLetter from "@/hooks/others/use-newsletter";
import LoaderButton from "@/components/shared/loader-button";

const subscribeFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

type SubscribeFormSchemaType = z.infer<typeof subscribeFormSchema>;

const Subscribe = () => {
  const { mutateAsync: subscribe, isPending } = useNewsLetter();

  const form = useForm<SubscribeFormSchemaType>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: SubscribeFormSchemaType) => {
    await subscribe({ query: { email } });
    form.reset();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Get newsletter updates</CardTitle>
        <CardDescription>
          Subscribe to get the latest news and updates about the project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="example@souravsspace.dev"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We will send you updates about the project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoaderButton
              type="submit"
              className="w-full"
              isLoading={isPending}
            >
              {isPending ? "Subscribing..." : "Subscribe"}
            </LoaderButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Subscribe;
