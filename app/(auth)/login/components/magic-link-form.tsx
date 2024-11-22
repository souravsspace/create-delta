"use client";

import { z } from "zod";

import { toast } from "sonner";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import LoaderButton from "@/components/shared/loader-button";

const FormSchema = z.object({
  email: z.string().email(),
});
type FormSchemaType = z.infer<typeof FormSchema>;

export function MagicLinkForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormSchemaType) {
    console.log(values);
    toast.success("Magic link sent to your email");
  }

  const isPending = false;

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
