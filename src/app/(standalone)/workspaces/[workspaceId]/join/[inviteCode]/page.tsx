import { getCurrent } from "@/features/auth/actions";
import JoinWorkspaceForm from "@/features/workspaces/components/JoinWorkspaceForm";
import { getWorkspaceInfo } from "@/features/workspaces/actions";
import { redirect } from "next/navigation";

import React from "react";

type Props = {
  params: Promise<{
    workspaceId: string;
    inviteCode: string;
  }>;
};

const JoinPage = async ({ params }: Props) => {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }
  const { workspaceId } = await params;

  const workspace = await getWorkspaceInfo(workspaceId);

  if (!workspace) return null;

  return (
    <div className="w-full max-w-2xl">
      <JoinWorkspaceForm name={workspace} />
    </div>
  );
};

export default JoinPage;
