"use client";
import { Admin, Student, Teacher } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";

import TeachersForm from "@/app/components/TeacherForm";
export const dynamic = "force-dynamic";
const Page = ({}) => {
  const [user, setCurrentUser] = useState<Admin | Student | Teacher | null>(
    null
  );

  const [mount, setMount] = useState(false);

  useEffect(() => {
    axios.get("/api/current-user").then((data) => setCurrentUser(data.data));
    setMount(true);
  }, []);

  if (!mount) {
    return <></>;
  }
  return <TeachersForm userRole={user?.role} variant='REGISTER' />;
};

export default Page;
