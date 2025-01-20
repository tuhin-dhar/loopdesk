"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateWorkspaceSchema } from "../schema";
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
import { useCreateWorkspace } from "../api/use-create-workspace";
import { ImageIcon, Loader2, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  onCancel?: () => void;
};

const CreateWorkspaceForm = ({ onCancel }: Props) => {
  const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (values: z.infer<typeof CreateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      imageUrl: values.imageUrl instanceof File ? values.imageUrl : "",
    };
    createWorkspace(
      { form: finalValues },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("imageUrl", file);
    }
  };

  return (
    <Card className="w-full h-full shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new workspace
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
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
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
                          Workspace Avatar
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
                          disabled={isPending}
                        />
                        {field.value ? (
                          <Button
                            type="button"
                            disabled={isPending}
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
                            disabled={isPending}
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
                )}
              />
              <div className="flex items-center justify-end gap-3">
                <Button
                  disabled={isPending}
                  variant={"secondary"}
                  type="button"
                  onClick={onCancel}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancel
                </Button>
                <Button disabled={isPending} variant={"default"}>
                  {isPending ? (
                    <div className="animate-spin">
                      <Loader2 />{" "}
                    </div>
                  ) : (
                    <div className="">Create</div>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateWorkspaceForm;
