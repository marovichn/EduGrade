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
  dateStart: string;
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
    accessorKey: "dateStart",
    header: "Date Assigned",
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {new Date(row.original.dateStart).toDateString()}
      </div>
    ),
  },
  {
    accessorKey: "dateDue",
    header: "Date Due",
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
      <div
        className={
          row.original.done
            ? "flex items-center gap-x-2 justify-center p-4 bg-green-200 rounded-full h-full w-full py-4 border-[1px] border-green-500"
            : "flex items-center gap-x-2 justify-center p-4 bg-red-200 rounded-full h-full w-full py-4 border-[1px] border-red-500"
        }
      >
        {row.original.done ? (
          <BadgeCheck className='text-green-500' size={25}/>
        ) : (
          <BadgeX className='text-red-500' size={25}/>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActionStudent data={row.original} />,
  },
];
