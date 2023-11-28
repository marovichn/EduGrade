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
      const teachers = groupsRes.data.map((g: any) => g.teacher);

      // Create a Set to store unique teacher IDs
      const uniqueTeacherIdsSet = new Set();

      // Create an array to store unique teachers
      const uniqueTeachers: any[] = [];

      // Iterate through the teachers array
      teachers.forEach((teacher: any) => {
        const teacherId = teacher?.id;
        if (!teacherId) {
          return;
        }
        // Check if the teacher's ID is not in the Set, and add it to the Set and the uniqueTeachers array
        if (!uniqueTeacherIdsSet.has(teacherId)) {
          uniqueTeacherIdsSet.add(teacherId);
          uniqueTeachers.push(teacher);
        }
      });

      // Now, uniqueTeachers contains unique teachers based on their IDs
      setTeachers(uniqueTeachers);
    };
    getTeachers();
  }, [user]);

  return (
    <div>
      <TeachersList users={teachers} roleUrl='teachers'></TeachersList>
    </div>
  );
};

export default MyTeachersDisplay;
