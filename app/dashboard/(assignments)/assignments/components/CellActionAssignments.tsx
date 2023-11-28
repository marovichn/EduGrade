"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/app/components/ui/dropdown-menu";
import { CheckCheck, MoreHorizontal, Trash, X } from "lucide-react";

import { AssignmentsColumn } from "./ColumnsAssignments";
import { Button } from "@/app/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

interface CellActionAssignmentsProps {
  data: AssignmentsColumn;
}

const CellActionAssignments: FC<CellActionAssignmentsProps> = ({ data }) => {
  const router = useRouter();
  const handleUpdate = async () => {
    const res = await axios.post(`/api/assignment/${data.id}`, {
      done: !data.done,
    });
    if (res?.status !== 200) {
      toast.error("Something went wrong!");
    } else {
      toast.success("Successfully updated assignment.");
      if (location) {
        location.reload();
      }
    }
  };
  const handleDelete = async () => {
    const res = await axios.delete(`/api/assignment/${data.id}`);
    if (res?.status !== 200) {
      toast.error("Something went wrong!");
    } else {
      toast.success("Successfully deleted assignment.");
      if (location) {
        location.reload();
      }
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
          <DropdownMenuItem onClick={handleUpdate}>
            <CheckCheck className='h-4 w-4 text-green-500 mr-2' />/
            <X className='mx-2 h-4 w-4 text-red-500' />
            Finish/Unfinish
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <Trash className='mr-2 h-4 w-4 text-red-500' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActionAssignments;
