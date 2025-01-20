"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <main className="bg-muted min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <div>
            <div className="flex gap-2 items-center">
              <Image src={"/logo.svg"} alt="logo" height={40} width={40} />
              <span className="text-2xl font-extrabold text-primary">
                LoopDesk
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant={"secondary"}>
              <Link href={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}>
                {pathname === "/sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
