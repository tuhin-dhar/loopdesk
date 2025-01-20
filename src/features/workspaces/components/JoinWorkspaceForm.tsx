"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace";
import Link from "next/link";
import React from "react";
import { useInviteCode } from "../hooks/use-inviteCode";
import { useWorkspaceId } from "../hooks/use-workspaceId";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type Props = {
  name: string;
};

const JoinWorkspaceForm = ({ name }: Props) => {
  const { mutate: joinWorkspace, isPending: isJoiningWorkspace } =
    useJoinWorkspace();

  const router = useRouter();

  const inviteCode = useInviteCode();
  const workspaceId = useWorkspaceId();

  const handleJoin = () => {
    joinWorkspace(
      {
        json: { code: inviteCode },
        param: { workspaceId: workspaceId },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been inivted to Join <strong>{name}</strong>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <Separator className="px-7" />
      </div>
      <CardContent className="p-7">
        <div className="flex  flex-col lg:flex-row items-center justify-between gap-2">
          <Button
            className="w-full lg:w-fit"
            variant={"destructive"}
            size={"lg"}
          >
            {" "}
            <Link href={"/"}> Cancel</Link>
          </Button>
          <Button
            onClick={handleJoin}
            className="w-full lg:w-fit"
            size={"lg"}
            disabled={isJoiningWorkspace}
          >
            {isJoiningWorkspace ? (
              <div className="animate-spin">
                <Loader2 />
              </div>
            ) : (
              <div>Join Workspace</div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinWorkspaceForm;
