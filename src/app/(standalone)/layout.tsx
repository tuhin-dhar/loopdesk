import { ModeToggle } from "@/components/mode-toggle";
import UserButton from "@/components/UserButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const StandaloneLayout = ({ children }: Props) => {
  return (
    <main className="bg-muted min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href={"/"}>
            <div className="flex gap-2 items-center">
              <Image src={"/logo.svg"} alt="logo" height={40} width={40} />
              <span className="text-2xl font-extrabold text-primary">
                LoopDesk
              </span>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-3">
            <UserButton />
            <ModeToggle />
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
};

export default StandaloneLayout;
