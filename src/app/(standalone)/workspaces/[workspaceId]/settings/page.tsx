import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import React from "react";
import WorkspaceSettingClient from "./client";

const WorkspaceSettings = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return <WorkspaceSettingClient />;
};

export default WorkspaceSettings;
