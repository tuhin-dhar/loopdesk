import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

type Props = {
  image?: string;
  name: string;
  className?: string;
};

const WorkspaceAvatar = ({ name, className, image }: Props) => {
  if (image) {
    return (
      <div
        className={cn("size-10 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-10 rounded-md", className)}>
      <AvatarFallback className="bg-muted border font-medium p text-neutral-500 flex items-center justify-center rounded-md">
        {name[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default WorkspaceAvatar;
