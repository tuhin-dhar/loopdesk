"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrent } from "@/features/auth/api/use-current";
import { Loader, LogOut } from "lucide-react";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import DottedSeparator from "./DottedSeparator";
import { useLogout } from "@/features/auth/api/use-logout";
import { Button } from "./ui/button";

const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout } = useLogout();

  if (!user) return null;

  const { name, email } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-muted">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-primary">
          <AvatarFallback className="bg-muted font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="w-64 bg-muted"
        sideOffset={5}
      >
        <div className="bg-muted flex items-center justify-center gap-3 p-1">
          <Avatar className="size-[52px] text-xl hover:opacity-75 transition border border-primary">
            <AvatarFallback className="bg-muted font-medium text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="bg-muted flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-500">
              {name || "User"}
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="bg-muted pt-1 mb-1" />
        <DropdownMenuItem className=" bg-muted h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer">
          <Button
            onClick={() => logout()}
            variant={"destructive"}
            className="flex justify-center items-center"
          >
            <span className="">Sign out</span>
            <LogOut className="size-4 mr-2" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
