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
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, Paperclip } from "lucide-react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { dropZoneConfigForProfileImage } from "@/constants/app-config";
import useProfileImageUpdate from "@/hooks/profile/use-profile-image-update";
import { useRouter } from "next/navigation";

const imageFormSchema = z.object({
  imageFile: z.string(),
});

type ImageFormSchema = z.infer<typeof imageFormSchema>;

const ProfileImageUpdate = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[] | null>(null);

  const { mutate: updateProfileImage, isPending: isUploading } =
    useProfileImageUpdate();

  const form = useForm<ImageFormSchema>({
    resolver: zodResolver(imageFormSchema),
  });

  const onSubmit = async () => {
    if (!files || files.length === 0) {
      toast.error("Please select an image to upload");
      form.setError("imageFile", {
        message: "Please select an image to upload",
      });
      return;
    }

    updateProfileImage(
      {
        form: {
          fileWrapper: files[0],
        },
      },
      {
        onSuccess: () => {
          toast.success("Profile image uploaded successfully!");
          form.reset();
          router.refresh();
        },
        onError: () => {
          toast.error("Failed to upload image. Please try again.");
        },
      },
    );
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Image</FormLabel>
                  <FormControl>
                    <FileUploader
                      {...field}
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfigForProfileImage}
                      className="relative rounded-lg bg-background p-2"
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                      >
                        <div className="flex w-full flex-col items-center justify-center p-8">
                          <CloudUpload className="h-10 w-10 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                            &nbsp; or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {files &&
                          files.length > 0 &&
                          files.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className="h-4 w-4 stroke-current" />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>
                    Select an profile image to upload.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardHeader>
          <CardFooter>
            <Button
              type="submit"
              disabled={isUploading}
              className="mt-4 w-full"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ProfileImageUpdate;
