"use client";

import { GroupDataTable } from "@/app/components/GroupDataTable";
import { FC, useEffect, useState } from "react";
import { columns } from "./ColumnsStudents";
import { Group} from "@prisma/client";
import axios from "axios";

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
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState<any[]>([]);
  useEffect(() => {
    const getGroups = async () => {
      const res = await axios.post("/api/my-groups", { user });
      if (res.status !== 200) {
        return;
      }
      setGroups(res.data);

      const studentIdsSet = new Set<string[]>(
        res.data.map((group: Group) => group.studentId)
      );
      //@ts-ignore
      const studentIds = [...studentIdsSet];
        
      studentIds.forEach((studentId) => {
        const getStudent = async () => {
          const student = await axios.post("/api/my-students", { studentId });
          setStudents((p) => [...p, student.data[0]]);
        };
        getStudent();
      });
    };
    getGroups();
  }, []);

  return (
    <div>
      <GroupDataTable
        columns={columns}
        data={students}
        searchKey='name'
      ></GroupDataTable>
    </div>
  );
};

export default MyStudentsDisplay;
