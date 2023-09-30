"use client";

import PageWrapper from "@/app/components/PageWrapper";
import { Calendar } from "@/app/components/ui/calendar";
import { FC, useEffect, useState } from "react";
import AttendanceForm from "./AttendanceForm";
import axios from "axios";
import { Admin, Group, Student, Teacher } from "@prisma/client";

interface AddAttendanceDisplayProps {
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

const AddAttendanceDisplay: FC<AddAttendanceDisplayProps> = ({ user }) => {
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
      <div className='flex items-center justify-around gap-x-5'>
        <div className='flex flex-col items-start justify-center'>
          <h1 className='text-3xl font-bold'>Add Attendance: </h1>
          <div className='flex flex-col items-start justify-center pt-10 w-full gap-y-6'>
            <h1>Choose Date:</h1>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              className='rounded-md border'
            />
          </div>
        </div>
        <div>
          <AttendanceForm
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

export default AddAttendanceDisplay;
