"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateProjectScehma } from "../schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ImageIcon, Loader2, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Project } from "../types";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useConfirm } from "@/hooks/useConfirm";
import { useUpdateProject } from "../api/use-update-project";
import { useDeleteProject } from "../api/use-delete-project";

type Props = {
  onCancel?: () => void;
  initialValues: Project;
};

export const EditProjectFrom = ({ onCancel, initialValues }: Props) => {
  const [DeleteDialog, confirmDelete] = useConfirm({
    message: "Confirming will permanently delete your Project",
    title: "Are you sure?",
    variant: "destructive",
  });

  const form = useForm<z.infer<typeof updateProjectScehma>>({
    resolver: zodResolver(updateProjectScehma),
    defaultValues: {
      ...initialValues,
      imageUrl: initialValues.imageUrl ?? "",
    },
  });

  const { mutate: editProject, isPending: isUpdatingProject } =
    useUpdateProject();
  const { mutate: deleteProject } = useDeleteProject();

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  // editing the project

  const onSubmit = (values: z.infer<typeof updateProjectScehma>) => {
    console.log("here");
    const finalValues = {
      ...values,
      imageUrl: values.imageUrl instanceof File ? values.imageUrl : "",
    };
    console.log(finalValues);
    editProject({
      form: finalValues,
      param: {
        projectId: initialValues.$id,
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("imageUrl", file);
    }
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) {
      return;
    }

    deleteProject(
      { param: { projectId: initialValues.$id } },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="w-full h-full shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size={"icon"}
            variant={"secondary"}
            onClick={
              onCancel
                ? onCancel
                : () =>
                    router.push(
                      `/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`
                    )
            }
          >
            <IoMdArrowRoundBack className="text-primary" />
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <Separator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isUpdatingProject}
                          placeholder="Enter workspace name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="size-[72px] relative -md overflow-hidden">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              alt="Workspace Avatar"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">
                            Project Avatar
                          </p>
                          <p className="text-muted-foreground text-sm">
                            JPG, PNG, SVG or JPEG(Max Size: 1mb)
                          </p>
                          <input
                            className="hidden"
                            accept=".jpg, .png, .jpeg, .svg"
                            type="file"
                            ref={inputRef}
                            onChange={handleChange}
                            disabled={isUpdatingProject}
                          />
                          <div className="flex flex-row items-center gap-3 justify-start">
                            {field.value ? (
                              <Button
                                type="button"
                                disabled={isUpdatingProject}
                                variant={"destructive"}
                                size={"xs"}
                                className="w-fit mt-2"
                                onClick={() => {
                                  field.onChange(null);
                                  if (inputRef.current) {
                                    inputRef.current.value = "";
                                  }
                                }}
                              >
                                <Trash2Icon /> Remove
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                disabled={isUpdatingProject}
                                variant={"outline"}
                                size={"xs"}
                                className="w-fit mt-2"
                                onClick={() => inputRef.current?.click()}
                              >
                                Upload Image
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
                <div className="flex items-center justify-end gap-3">
                  <Button
                    disabled={isUpdatingProject}
                    variant={"secondary"}
                    type="button"
                    onClick={onCancel}
                    className={cn(!onCancel && "invisible")}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isUpdatingProject}
                    variant={"default"}
                    type="submit"
                  >
                    {isUpdatingProject ? (
                      <div className="animate-spin">
                        <Loader2 />{" "}
                      </div>
                    ) : (
                      <div className="">Save Changes</div>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full shadow-none border border-red-500">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workpsace is a irreversible action and will remove all
              associated data along with it
            </p>
            <Button
              className="mt-7 w-fit ml-auto"
              size={"sm"}
              variant={"destructive"}
              type="button"
              disabled={isUpdatingProject}
              onClick={handleDelete}
            >
              Delete Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProjectFrom;
