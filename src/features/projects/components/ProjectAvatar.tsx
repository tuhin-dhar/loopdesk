import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  image?: string;
  name: string;
  className?: string;
};

const ProjectAvatar = ({ name, className, image }: Props) => {
  if (image) {
    return (
      <div
        className={cn("size-5 relative rounded-sm overflow-hidden", className)}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5 rounded-sm", className)}>
      <AvatarFallback
        className={
          (cn(
            "bg-muted border font-bold p text-neutral-500 flex items-center justify-center rounded-md "
          ),
          className)
        }
      >
        {name[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProjectAvatar;
