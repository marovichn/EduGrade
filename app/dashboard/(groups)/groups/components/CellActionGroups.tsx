"use client";

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import {
  CalendarCheck,
  CheckCheck,
  Edit,
  ListTodo,
  MoreHorizontal,
  ShieldAlert,
  Sticker,
  Trash,
} from "lucide-react";

import { GroupColumn } from "./ColumnsGroups";
import AlertModal from "@/app/components/modals/AlertModal";
import { Button } from "@/app/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

interface CellActionsGroupsProps {
  data: GroupColumn;
}

const CellActionsGroups: FC<CellActionsGroupsProps> = ({ data }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const info = {
        id: data.id,
        role: "Group",
      };
      if (!info) {
        return;
      }
      const res = await axios.delete("/api/delete", { data: info });
      if (res.status !== 200) {
        toast.error("Something went wrong");
      }
      toast.success("Successfully deleted!");
      router.push("/dashboard/groups");
      if (location) {
        location.reload();
      }
    } catch (err: any) {
      if (err?.response.status === 401) {
        toast.error("You are not allowed to do that!");
      }
      toast.error("Something went wrong");
    }
  };


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open Menu</span>
            <MoreHorizontal className='h-4 w-4 ' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/create-assignments`)}
          >
            <button
              onClick={handleDelete}
              className='flex items-center justify-center gap-x-4 text-white font-bold bg-red-500 p-5 rounded-lg'
            >
              <Trash />
              Delete Group
              <ShieldAlert size={20} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActionsGroups;
