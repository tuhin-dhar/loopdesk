"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col gap-y-2 items-center justify-center">
      <MdOutlineErrorOutline className="size-9" />
      <p className="text-sm">Something Went Wrong</p>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
