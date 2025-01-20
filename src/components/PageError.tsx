import React from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Button } from "./ui/button";
import { Link } from "lucide-react";

const PageError = () => {
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

export default PageError;
