"use client";
import { Admin, Student, Teacher } from "@prisma/client";
import PageWrapper from "../components/PageWrapper";
import Actions from "../components/Actions";
import { useEffect, useState } from "react";
import axios from "axios";


const Page = ({}) => {
  const [user, setCurrentUser] = useState<Admin | Student | Teacher | null>(
    null
  );

  useEffect(() => {
    axios.get("/api/current-user").then((data) => setCurrentUser(data.data));
  }, []);

  return (
    <PageWrapper>
      <h1 className='text-4xl font-extrabold text-gray-700'>
        Welcome back, {user?.name}!
      </h1>
      <p className='font-light'>{user?.role}</p>

      <Actions userRole={user?.role}></Actions>
    </PageWrapper>
  );
};

export default Page;
