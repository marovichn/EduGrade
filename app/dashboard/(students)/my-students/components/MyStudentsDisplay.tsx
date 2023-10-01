"use client";

import { GroupDataTable } from "@/app/components/GroupDataTable";
import { FC, useEffect, useState } from "react";
import { columns } from "./ColumnsStudents";
import { Group } from "@prisma/client";
import axios from "axios";
import PageWrapper from "@/app/components/PageWrapper";

interface MyStudentsDisplayProps {
  user: {
    id: string;
    name: string | null;
    lastname: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    hashedPassword: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: string | null;
    code: string | null;
  } | null;
}

const MyStudentsDisplay: FC<MyStudentsDisplayProps> = ({ user }) => {
  const [groups, setGroups] = useState<any[]>([]);
  useEffect(() => {
    const getGroups = async () => {
      const res = await axios.post("/api/my-groups", { user });
      if (res.status !== 200) {
        return;
      }
      const groupedByStudentId: any = {};
      res.data.forEach((group: Group) => {
        const studentId = group.studentId;
        if (!groupedByStudentId[studentId]) {
          groupedByStudentId[studentId] = group;
        }
      });
      setGroups(Object.values(groupedByStudentId));
    };

    getGroups();
  }, []);

  return (
    <div>
      <PageWrapper>
        <h1 className='text-3xl font-bold'>My Students:</h1>
        <GroupDataTable
          columns={columns}
          data={groups}
          searchKey='name'
        ></GroupDataTable>
      </PageWrapper>
    </div>
  );
};

export default MyStudentsDisplay;
