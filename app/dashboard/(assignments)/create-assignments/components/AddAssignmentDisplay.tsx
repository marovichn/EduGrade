"use client";

import PageWrapper from "@/app/components/PageWrapper";
import { Calendar } from "@/app/components/ui/calendar";
import { FC, useEffect, useState } from "react";
import AssignmentsForm from "./AssignmentsForm";
import axios from "axios";
import { Admin, Group, Student, Teacher } from "@prisma/client";

interface AddAssignmentDisplayProps {
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

const AddAssignmentDisplay: FC<AddAssignmentDisplayProps> = ({ user }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
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
    <PageWrapper>
      <div className='min-sm:max-md:flex-col min-sm:max-md:flex  md:flex items-start justify-around gap-x-5'>
        <div className='flex flex-col items-start max-md:items-center'>
          <h1 className='text-4xl font-bold mb-10 mt-6 '>Create Assignment:</h1>
          <h1 className=''>Choose Date Due:</h1>
          <p className='mb-3 text-xs'>(from now)</p>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            className='rounded-md border'
          />
        </div>
        <div className='w-full max-md:mt-20'>
          <AssignmentsForm
            date={date}
            userRole={user?.role}
            groups={groups}
            students={students}
            subjects={subjects}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddAssignmentDisplay;
