"use client";
import { Admin, Student, Teacher } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";

import TeachersForm from "@/app/components/TeacherForm";

const Page = ({}) => {
  const [user, setCurrentUser] = useState<Admin | Student | Teacher | null>(
    null
  );

  useEffect(() => {
    axios.get("/api/current-user").then((data) => setCurrentUser(data.data));
  }, []);

  return <TeachersForm userRole={user?.role} variant='REGISTER' />;
};

export default Page;
