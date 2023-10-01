"use client";

import { GroupDataTable } from "@/app/components/GroupDataTable";
import PageWrapper from "@/app/components/PageWrapper";
import { FC, useEffect, useState } from "react";
import { columns } from "./ColumnsAssignments";
import axios from "axios";
import { ListTodo, Plus } from "lucide-react";
import Link from "next/link";
import { Assignment } from "@prisma/client";

interface AssignmentsDisplayProps {}

const AssignmentsDisplay: FC<AssignmentsDisplayProps> = ({}) => {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    const getAssignments = async () => {
      const res = await axios.get("/api/assignments");
      if (res.status !== 200) {
        return;
      }
      const assignments = [].concat(...res.data);
      setAssignments(assignments);
    };
    getAssignments();
  }, []);
  return (
    <div>
      <PageWrapper>
        <div className='w-full flex items-center justify-between mb-10'>
          <h1 className='text-4xl font-bold'>All My Assignments:</h1>
          <Link
            href='/dashboard/create-assignments'
            className='w-12 h-12 p-2 pl-3 bg-yellow-300 flex items-center justify-center rounded-md cursor-pointer'
          >
            <div className='flex'>
              <ListTodo />
              <Plus size={10} />
            </div>
          </Link>
        </div>

        <GroupDataTable
          columns={columns}
          data={assignments}
          searchKey='type'
        ></GroupDataTable>
      </PageWrapper>
    </div>
  );
};

export default AssignmentsDisplay;
