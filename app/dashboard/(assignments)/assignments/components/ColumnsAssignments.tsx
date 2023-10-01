"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActionGroup from "./CellActionAssignments";
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
import CellActionStudent from "./CellActionAssignments";
import { BadgeCheck, BadgeX } from "lucide-react";

export type AssignmentsColumn = {
  id: string;
  type: string;
  createdAt: string;
  dateDue: string;
  points: string;
  done: boolean;
};

export const columns: ColumnDef<AssignmentsColumn>[] = [
  {
    accessorKey: "type",
    header: "Type of Assignment",
  },
  {
    accessorKey: "points",
    header: "Number of Points",
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
    accessorKey: "dateDue",
    header: "Date Enrolled",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {new Date(row.original.dateDue).toDateString()}
      </div>
    ),
  },
  {
    accessorKey: "done",
    header: "Finished",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.done ? <BadgeCheck /> : <BadgeX />}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionStudent data={row.original} />,
  },
];
