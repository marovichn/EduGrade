"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActionGroup from "./CellActionGroup"
import {
  Activity,
  Assignment,
  Attendance,
  Result,
  Student,
  Subject,
  Teacher,
} from "@prisma/client";

export type GroupColumn = {
  id: string;
  name: string;
  createdAt: string;
  results: Result[];
  attendances: Attendance[];
  assignments: Assignment[];
  activityGrades: Activity[];
  teacher: Teacher;
  student: Student;
  subject: Subject;
};

export const columns: ColumnDef<GroupColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "teacher",
    header: "Group Teacher",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.teacher?.name}
      </div>
    ),
  },
  {
    accessorKey: "student",
    header: "Group Student",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.student?.name}
      </div>
    ),
  },
  {
    accessorKey: "subject",
    header: "Group Subject",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.subject?.name}
      </div>
    ),
  },
  {
    accessorKey: "results",
    header: "Number of Results",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.results?.length}
      </div>
    ),
  },
  {
    accessorKey: "attendances",
    header: "All Attendances Number",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.attendances?.length}
      </div>
    ),
  },
  {
    accessorKey: "assignments",
    header: "Assignments Number",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.assignments?.length}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionGroup data={row.original} />,
  },
];