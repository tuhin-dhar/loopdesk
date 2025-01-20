import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  name: string;
  className?: string;
  fallbackClassName?: string;
};

const MemberAvatar = ({ name, className, fallbackClassName }: Props) => {
  return (
    <Avatar
      className={cn(
        "size-5 transition border border-primary rounded-full",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "bg-neutral-200 font-medium text-primary items-center justify-center",
          fallbackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default MemberAvatar;
