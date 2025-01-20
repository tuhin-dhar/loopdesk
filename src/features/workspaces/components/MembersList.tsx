"use client";

import React from "react";
import { useWorkspaceId } from "../hooks/use-workspaceId";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { useGetMembers } from "@/features/members/api/use-get-members";
import MemberAvatar from "@/features/members/components/MemberAvatar";
import { MoreVerticalIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import DottedSeparator from "@/components/DottedSeparator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/useConfirm";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data: members } = useGetMembers({ workspaceId: workspaceId });
  const [RemoveDialog, confirmDelete] = useConfirm({
    message:
      "Deleting a member will remove all data in the workspace related to the member",
    title: "Are you sure?",
    variant: "destructive",
  });

  const { mutate: deleteMember, isPending: isDeleting } = useDeleteMember();
  const { mutate: updateRole, isPending: isUpdating } = useUpdateMember();

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateRole({ json: { role: role }, param: { memberId: memberId } });
  };

  const handleDelete = async (memberId: string) => {
    const ok = await confirmDelete();
    if (!ok) {
      return;
    }

    deleteMember(
      { param: { memberId: memberId } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };

  return (
    <Card className="w-full h-full shadow-none">
      <RemoveDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button asChild size={"icon"} variant={"secondary"}>
          <Link href={`/workspaces/${workspaceId}`}>
            <IoMdArrowRoundBack className="text-primary" />
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]">Avatar</TableHead>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[200px]">Role</TableHead>
              <TableHead className="text-right">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.documents.map((member, index) => (
              <TableRow key={member.$id}>
                <TableCell align="center">
                  <MemberAvatar name={member.name} />
                </TableCell>
                <TableCell>
                  <p className="text-sm font-medium">{member.name}</p>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="text-xs text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                  <div></div>
                </TableCell>
                <TableCell>
                  {member.role === MemberRole.ADMIN ? (
                    <Badge className="bg-blue-400 hover:bg-blue-600">
                      <MdAdminPanelSettings />: ADMIN
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-400 hover:bg-amber-600">
                      <FaUserCheck />: MEMBER{" "}
                    </Badge>
                  )}
                </TableCell>
                <TableCell align="right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="ml-auto"
                        size={"icon"}
                        variant={"secondary"}
                      >
                        <MoreVerticalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end">
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() => {
                          handleUpdateMember(member.$id, MemberRole.ADMIN);
                        }}
                        disabled={isUpdating}
                      >
                        <MdAdminPanelSettings />
                        Set as Administration
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() => {
                          handleUpdateMember(member.$id, MemberRole.MEMBER);
                        }}
                        disabled={isUpdating}
                      >
                        <FaUserCheck />
                        Set as Member
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="font-medium text-red-500"
                        onClick={() => handleDelete(member.$id)}
                        disabled={isDeleting}
                      >
                        <GiExitDoor />
                        Remove {member.name}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                {index < members.documents.length - 1 && (
                  <Separator className="my-2.5 text-muted-foreground" />
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MembersList;
