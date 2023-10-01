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
            onClick={() => router.push(`/dashboard/create-results`)}
          >
            <CheckCheck className='mr-2 h-4 w-4' />
            Add Grade
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/create-activity`)}
          >
            <Sticker className='mr-2 h-4 w-4' />
            Add Activity
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/add-attendance`)}
          >
            <CalendarCheck className='mr-2 h-4 w-4' />
            Add Attendance
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/create-assignment`)}
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
