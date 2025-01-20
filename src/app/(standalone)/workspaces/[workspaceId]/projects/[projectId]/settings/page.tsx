import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import React from "react";
import ProjectSettingClient from "./client";

const SettingsPage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <ProjectSettingClient />;
};

export default SettingsPage;
