import Image from "next/image";
import Link from "next/link";
import React from "react";
import DottedSeparator from "./DottedSeparator";
import Navigation from "./Navigation";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import Projects from "./Projects";

const Sidebar = () => {
  return (
    <aside className="h-full bg-muted p-4 w-full">
      <Link href={"/"}>
        <div className="flex gap-2 items-center">
          <Image src={"/logo.svg"} alt="logo" height={40} width={40} />
          <span className="text-2xl font-extrabold text-primary">LoopDesk</span>
        </div>
      </Link>
      <DottedSeparator className="my-4" color="#266463" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" color="#266463" />
      <Navigation />
      <DottedSeparator className="my-4" color="#266463" />
      <Projects />
    </aside>
  );
};

export default Sidebar;
