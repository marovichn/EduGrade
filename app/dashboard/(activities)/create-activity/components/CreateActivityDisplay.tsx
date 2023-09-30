"use client";

import { FC, useEffect, useState } from "react";
import ResultsForm from "./ActivityForm";
import axios from "axios";
import { Admin, Group, Student, Teacher } from "@prisma/client";

interface CreateResultDisplayProps {
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

const CreateResultDisplay: FC<CreateResultDisplayProps> = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
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
      const subjectIdsSet = new Set<string>(
        res.data.map((group: Group) => group.subjectId)
      );
      //@ts-ignore
      const subjectIds = [...subjectIdsSet];

      studentIds.forEach((studentId) => {
        const getStudent = async () => {
          const student = await axios.post("/api/my-students", { studentId });
          setStudents((p) => [...p, student.data[0]]);
        };
        getStudent();
      });

      subjectIds.forEach((subjectId: string) => {
        const getSubject = async () => {
          const subject = await axios.post("/api/my-subjects", { subjectId });
          setSubjects((p) => [...p, subject.data[0]]);
        };
        getSubject();
      });

      if (res.status !== 200) {
        return;
      }
    };
    getGroups();
  }, []);

  return (
    <>
      <ResultsForm
        subjects={subjects}
        students={students}
        groups={groups}
        userRole={user?.role}
      />
    </>
  );
};

export default CreateResultDisplay;
