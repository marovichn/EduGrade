"use client";

import { FC } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Group, Teacher } from "@prisma/client";
import TeachersList from "./TeachersList";

interface MyTeachersDisplayProps {
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

const MyTeachersDisplay: FC<MyTeachersDisplayProps> = ({ user }) => {
  const [teachers, setTeachers] = useState<any[]>([]);
  useEffect(() => {
    const getTeachers = async () => {
      const groupsRes = await axios.post("/api/my-groups", { user });
      if (groupsRes.status !== 200) {
        return;
      }
      //@ts-ignore
      const teachers = groupsRes.data.map((group: Group) => group.teacher);
      //@ts-ignore
      const teachersSet = new Set<Teacher>(teachers);
      console.log(teachersSet);
      //@ts-ignore
      const teachersSetted = [...teachersSet];
      setTeachers(teachersSetted);
    };
    getTeachers();
  }, []);

  return (
    <div>
      <TeachersList users={teachers} roleUrl='teachers'></TeachersList>
    </div>
  );
};

export default MyTeachersDisplay;
