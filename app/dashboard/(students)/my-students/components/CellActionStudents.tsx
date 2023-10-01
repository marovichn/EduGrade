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
import { CalendarCheck, CheckCheck, Edit, ListTodo, MoreHorizontal, Sticker, Trash } from "lucide-react";

import { StudentColumn } from "./ColumnsStudents";
import AlertModal from "@/app/components/modals/AlertModal";
import { Button } from "@/app/components/ui/button";

interface CellActionStudentProps {
  data: StudentColumn;
}

const CellActionStudent: FC<CellActionStudentProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open Menu</span>
            <MoreHorizontal className='h-4 w-4 ' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/create-results/${data.id}`)}
          >
            <CheckCheck className='mr-2 h-4 w-4' />
            Add Grade
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/create-results/${data.id}`)}
          >
            <Sticker className='mr-2 h-4 w-4' />
            Add Activity
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/create-results/${data.id}`)}
          >
            <CalendarCheck className='mr-2 h-4 w-4' />
            Add Attendance
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/create-results/${data.id}`)}
          >
            <ListTodo className='mr-2 h-4 w-4' />
            Add Assignment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActionStudent;
