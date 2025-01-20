"use client";

import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import React from "react";
import { LuSettings2 } from "react-icons/lu";
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoHome,
  GoHomeFill,
} from "react-icons/go";
import { IconType } from "react-icons/lib";
import { FaUsers } from "react-icons/fa";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspaceId";
import { usePathname } from "next/navigation";

type Routes = {
  label: string;
  href: string;
  icon:
    | IconType
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
  activeIcon:
    | IconType
    | React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
}[];

const routes: Routes = [
  {
    label: "Home",
    href: "",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: LuSettings2,
    activeIcon: LuSettings2,
  },
  {
    label: "Members",
    href: "/members",
    icon: FaUsers,
    activeIcon: FaUsers,
  },
];

const Navigation = () => {
  const workspaceId = useWorkspaceId();

  const pathname = usePathname();

  return (
    <ul className="flex flex-col">
      {routes.map((route) => {
        const fullHref = `/workspaces/${workspaceId}${route.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? route.activeIcon : route.icon;
        return (
          <Link key={route.href} href={fullHref}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-black transition text-primary",
                isActive && "bg-primary text-muted shadow-sm hover:opacity-100 "
              )}
            >
              <Icon />
              {route.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};

export default Navigation;
