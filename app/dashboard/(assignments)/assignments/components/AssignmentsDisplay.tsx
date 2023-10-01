"use client";

import { GroupDataTable } from "@/app/components/GroupDataTable";
import PageWrapper from "@/app/components/PageWrapper";
import { FC, useEffect, useState } from "react";
import { columns } from "./ColumnsAssignments";
import axios from "axios";

interface AssignmentsDisplayProps {}

const AssignmentsDisplay: FC<AssignmentsDisplayProps> = ({}) => {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    const getAssignments = async () => {
      const res = await axios.get("/api/assignments");
      if (res.status !== 200) {
        return;
      }
      setAssignments(res.data);
    };
    getAssignments();
  }, []);
  return (
    <div>
      <PageWrapper>
        <h1 className='text-3xl font-bold'>All Assignments:</h1>
        <GroupDataTable
          columns={columns}
          data={assignments}
          searchKey='name'
        ></GroupDataTable>
      </PageWrapper>
    </div>
  );
};

export default AssignmentsDisplay;
