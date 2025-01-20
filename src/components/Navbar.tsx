"use client";

import React from "react";
import UserButton from "./UserButton";
import { ModeToggle } from "./mode-toggle";
import MobileSidebar from "./MobileSidebar";
import { usePathname } from "next/navigation";

const pathnameMap = {
  tasks: {
    title: "My Tasks",
    description: "View all your tasks here",
  },
  projects: {
    title: "My Projects",
    description: "View all your projects here",
  },
};

const defaultMap = {
  title: "Home",
  description: "   Monitor all your projects and tasks here",
};

const Navbar = () => {
  const pathname = usePathname();

  const pathanmeParts = pathname.split("/");

  const pathanmeKey = pathanmeParts[3] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathanmeKey] || defaultMap;

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex w-full">
        <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="w-full flex gap-3 items-center justify-between">
        <div>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-3">
          <UserButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
