"use client";

import { FC, useEffect, useState } from "react";
import UpdatesList from "./UpdatesList";
import axios from "axios";

interface UpdateDisplayProps {
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

const UpdateDisplay: FC<UpdateDisplayProps> = ({ user }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const assignmentRes = await axios.get("/api/assignments");
      //@ts-ignore
      user?.groups.forEach(async (group) => {
        const resultRes = await axios.post("/api/my-results", {
          groupId: group.id,
        });
        const attendanceRes = await axios.post("/api/my-attendances", {
          groupId: group.id,
        });
        console.log(resultRes.data, attendanceRes.data);
      });
      if (assignmentRes.status !== 200) {
        return;
      }
      const assignments = [].concat(...assignmentRes.data);
      setData(assignments);
    };
    getData();
  }, []);
  return (
    <div className=''>
      <div className='w-full fixed bg-white border-b-2 h-14 p-4 flex items-center justify-start font-bold z-10'>
        <h1>
          {user?.name} {user?.lastname} {"  "} ({user?.role})
        </h1>
      </div>
      <div className='bg-auth-banner w-full h-screen bg-fixed opacity-20 absolute'></div>
      <div className='pt-[80px]'>
        <UpdatesList />
      </div>
    </div>
  );
};

export default UpdateDisplay;
