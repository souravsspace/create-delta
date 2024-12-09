"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoaderButton from "@/components/shared/loader-button";
import useSendMagicLink from "@/hooks/others/use-send-magic-link";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
type FormSchemaType = z.infer<typeof FormSchema>;

const MagicLinkForm = () => {
  const { mutate, isPending } = useSendMagicLink();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = ({ email }: FormSchemaType) => {
    mutate({ json: { email } });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="w-full"
                  placeholder="example@email.com"
                  type="email"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                We&apos;ll send you a magic link to create your account or sign
                in.
              </FormDescription>
            </FormItem>
          )}
        />
        <LoaderButton isLoading={isPending} className="w-full" type="submit">
          Login with Magic Link
        </LoaderButton>
      </form>
    </Form>
  );
};

export default MagicLinkForm;
