"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActionGroup from "./CellActionStudents";
import {
  Activity,
  Assignment,
  Attendance,
  Group,
  Result,
  Student,
  Subject,
  Teacher,
} from "@prisma/client";
import CellActionStudent from "./CellActionStudents";

export type StudentColumn = {
  id: string;
  name: string;
  createdAt: string;
  results: Result[];
  attendances: Attendance[];
  assignments: Assignment[];
  activityGrades: Activity[];
  subject: Subject;
  studentId: string;
  student: Student;
};

export const columns: ColumnDef<StudentColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.student?.name ? row.original.student?.name : "0"}
      </div>
    ),
  },
  {
    accessorKey: "results",
    header: "Number of Grades",
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
    accessorKey: "activityGrades",
    header: "Activities Number",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.activityGrades?.length
          ? row.original.activityGrades?.length
          : "0"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Enrolled",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {new Date(row.original.createdAt).toDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionStudent data={row.original} />,
  },
];
