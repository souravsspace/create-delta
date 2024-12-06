"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoaderButton from "@/components/shared/loader-button";
import useSendMagicLink from "@/hooks/others/use-send-magic-link";

const FormSchema = z.object({
  email: z.string().email(),
});
type FormSchemaType = z.infer<typeof FormSchema>;

export function MagicLinkForm() {
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
                  placeholder="Enter your email"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={isPending} className="w-full" type="submit">
          Sign in with magic link
        </LoaderButton>
      </form>
    </Form>
  );
}
