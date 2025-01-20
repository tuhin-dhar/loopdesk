import { getCurrent } from "@/features/auth/actions";
import MembersList from "@/features/workspaces/components/MembersList";
import { redirect } from "next/navigation";
import React from "react";

const WorkspaceIdMembersPage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <div className="w-full lg:max-w-2xl">
      <MembersList />
    </div>
  );
};

export default WorkspaceIdMembersPage;
