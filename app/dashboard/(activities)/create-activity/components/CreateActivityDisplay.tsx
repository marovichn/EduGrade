"use client";

import { FC, useEffect, useState } from "react";
import ResultsForm from "./ActivityForm";
import axios from "axios";
import { Group, Student, Subject } from "@prisma/client";

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
  const [groups, setGroups] = useState<Group[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.post("/api/my-groups", { user });

        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        setGroups(res.data);

        const studentIds = Array.from(
          new Set<string>(res.data.map((group: Group) => group.studentId))
        );
        const subjectIds = Array.from(
          new Set<string>(res.data.map((group: Group) => group.subjectId))
        );

        const [studentsData, subjectsData] = await Promise.all([
          axios.post("/api/my-students", { studentIds }),
          axios.post("/api/my-subjects", { subjectIds }),
        ]);

        setStudents(studentsData.data);
        setSubjects(subjectsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      {loading && (
        <div className='h-[80vh] w-full flex items-center justify-center'>
          <div className='w-[100px] h-[100px] border-b-8 border-b-black rounded-full animate-spin'></div>
        </div>
      )}
      {!loading && (
        <ResultsForm
          subjects={subjects}
          students={students}
          groups={groups}
          userRole={user?.role}
        />
      )}
    </>
  );
};

export default CreateResultDisplay;
