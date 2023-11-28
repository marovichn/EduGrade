"use client";
import { Admin, Student, Teacher } from "@prisma/client";
import axios from "axios";

import { columns } from "./components/ColumnsGroups";

import PageWrapper from "@/app/components/PageWrapper";
import GroupDisplay from "./components/GroupDisplay";

interface PageProps {
  user: Admin | Student | Teacher | null;
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get("/api/current-user");
    const user = data;

    return {
      props: { user },
    };
  } catch (error) {
    console.error("Error fetching current user:", error);

    return {
      props: { user: null },
    };
  }
}
const page = ({ user }: PageProps) => {
  return (
    <PageWrapper>
      <div className='mb-16 text-4xl font-bold flex items-center justify-between'>
        <h1>My Groups on EduGrade:</h1>
      </div>
      <GroupDisplay user={user} columns={columns} />
    </PageWrapper>
  );
};

export default page;
