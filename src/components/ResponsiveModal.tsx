import React from "react";
import { useMedia } from "react-use";
import { Dialog, DialogContent } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ResponsiveModal = ({ children, onOpenChange, open }: Props) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="w-full p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh] flex justify-center items-center">
          <div className="w-full flex justify-center">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModal;
