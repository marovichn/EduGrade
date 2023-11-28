"use client";
import { Admin, Student, Teacher } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";

import AdminForm from "@/app/components/AdminForm";

const Page = ({}) => {
  const [user, setCurrentUser] = useState<Admin | Student | Teacher | null>(
    null
  );

  useEffect(() => {
    axios.get("/api/current-user").then((data) => setCurrentUser(data.data));
  }, []);

  return <AdminForm userRole={user?.role} variant='REGISTER' />;
};

export default Page;
