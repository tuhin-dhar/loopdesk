import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "./button";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "password", ...props }, ref) => {
    const [viewPassword, setViewPassword] = React.useState(false);
    console.log(type);
    return (
      <div className="flex items-center gap-3 border border-input rounded-md">
        <input
          type={viewPassword ? "text" : "password"}
          className={cn(
            "flex h-12 w-full bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:rounded-md disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={(e) => {
            e.preventDefault();
            setViewPassword((prev) => !prev);
          }}
        >
          {viewPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </Button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
