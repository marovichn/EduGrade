"use client";
import { Admin, Student, Teacher } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";

import { columns } from "./components/ColumnsGroups";

import PageWrapper from "@/app/components/PageWrapper";
import GroupDisplay from "./components/GroupDisplay";

const Page = () => {
  const [user, setCurrentUser] = useState<Admin | Student | Teacher | null>(
    null
  );

  useEffect(() => {
    axios.get("/api/current-user").then((data) => setCurrentUser(data.data));
  }, []);
  return (
    <PageWrapper>
      <div className='mb-16 text-4xl font-bold flex items-center justify-between'>
        <h1>My Groups on EduGrade:</h1>
      </div>
      <GroupDisplay user={user} columns={columns} />
    </PageWrapper>
  );
};

export default Page;
