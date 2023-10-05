"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Activity,
  Assignment,
  Attendance,
  Result,
  Student,
  Subject,
  Teacher,
} from "@prisma/client";
import CellActionsGroups from "./CellActionGroups";

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
        {row.original.results?.length ? row.original.results?.length : "0"}
      </div>
    ),
  },
  {
    accessorKey: "attendances",
    header: "All Attendances Number",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.attendances?.length
          ? row.original.attendances?.length
          : "0"}
      </div>
    ),
  },
  {
    accessorKey: "assignments",
    header: "Assignments Number",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.assignments?.length
          ? row.original.assignments?.length
          : "0"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {new Date(row.original.createdAt).toDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionsGroups data={row.original} />,
  },
];
