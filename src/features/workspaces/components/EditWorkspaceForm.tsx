"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateWorkspaceSchema } from "../schema";
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
import { CopyIcon, ImageIcon, Loader2, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useConfirm } from "@/hooks/useConfirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useToast } from "@/hooks/use-toast";
import { useResetInviteCode } from "../api/use-reset-invite-code";

type Props = {
  onCancel?: () => void;
  initialValues: Workspace;
};

export const EditWorkspaceForm = ({ onCancel, initialValues }: Props) => {
  const [fullInviteLink, setFullInviteLink] = useState("");

  const [DeleteDialog, confirmDelete] = useConfirm({
    message: "Confirming will permanently delete your Workspace",
    title: "Are you sure?",
    variant: "destructive",
  });
  const [ResetDialog, confirmReset] = useConfirm({
    title: "Reset Invite Link?",
    message: "Confirming will render the previous link invalid",
    variant: "default",
  });

  const form = useForm<z.infer<typeof UpdateWorkspaceSchema>>({
    resolver: zodResolver(UpdateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      imageUrl: initialValues.imageUrl ?? "",
    },
  });

  const { mutate: editWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();
  const { mutate: resetInviteCode, isPending: isResetingInviteCode } =
    useResetInviteCode();

  const router = useRouter();
  const { toast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);

  // editing the workspace

  const onSubmit = (values: z.infer<typeof UpdateWorkspaceSchema>) => {
    console.log("here");
    const finalValues = {
      ...values,
      imageUrl: values.imageUrl instanceof File ? values.imageUrl : "",
    };
    console.log(finalValues);
    editWorkspace({
      form: finalValues,
      param: {
        workspaceId: initialValues.$id,
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("imageUrl", file);
    }
  };

  // deleting workpsace

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) {
      return;
    }

    deleteWorkspace(
      { param: { workspaceId: initialValues.$id } },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  // related to invite code

  useEffect(() => {
    const origin = window.location.origin;
    const link = `${origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;
    setFullInviteLink(link);
  }, [initialValues]);

  const handleCopyInviteLink = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() =>
        toast({ title: "Invite Link Copied!", className: "bg-green-500" })
      );
  };

  const handleResetInviteCode = async () => {
    const ok = await confirmReset();
    if (!ok) {
      return;
    }

    resetInviteCode(
      { param: { workspaceId: initialValues.$id } },
      {
        onSuccess: () => router.refresh(),
      }
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <ResetDialog />
      <Card className="w-full h-full shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size={"icon"}
            variant={"secondary"}
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.$id}`)
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
                      <FormLabel>Workspace Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isUpdatingWorkspace}
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
                            disabled={isUpdatingWorkspace}
                          />
                          <div className="flex flex-row items-center gap-3 justify-start">
                            {field.value ? (
                              <Button
                                type="button"
                                disabled={isUpdatingWorkspace}
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
                                disabled={isUpdatingWorkspace}
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
                    disabled={isUpdatingWorkspace}
                    variant={"secondary"}
                    type="button"
                    onClick={onCancel}
                    className={cn(!onCancel && "invisible")}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isUpdatingWorkspace}
                    variant={"default"}
                    type="submit"
                  >
                    {isUpdatingWorkspace ? (
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
      <Card className="w-full h-full shadow-none border ">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Invite Members</h3>
            <p className="text-sm text-muted-foreground">
              Use the invite link to add members to your workspace
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input value={fullInviteLink} disabled />
                <Button
                  variant={"secondary"}
                  onClick={handleCopyInviteLink}
                  className="size-12"
                >
                  <CopyIcon />
                </Button>
              </div>
            </div>
            <Button
              className="mt-7 w-fit ml-auto"
              size={"sm"}
              variant={"outline"}
              type="button"
              disabled={
                isUpdatingWorkspace ||
                isDeletingWorkspace ||
                isResetingInviteCode
              }
              onClick={handleResetInviteCode}
            >
              Reset Invite Link
            </Button>
          </div>
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
              disabled={isUpdatingWorkspace || isDeletingWorkspace}
              onClick={handleDelete}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditWorkspaceForm;
