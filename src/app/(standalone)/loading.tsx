import { Loader } from "lucide-react";
import React from "react";

const StandaloneLoading = () => {
  return (
    <div className="h-screen flex flex-col gap-y-3 items-center justify-center">
      <Loader className="size-9 animate-spin text-primary" />
      <p className="text-lg  font-semibold">
        Hold tight! Great things are worth the wait⏳✨
      </p>
    </div>
  );
};

export default StandaloneLoading;
