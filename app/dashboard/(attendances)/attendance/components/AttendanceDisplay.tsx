"use client";

import { FC, useEffect, useState } from "react";
import UpdatesList from "@/app/components/UpdatesList";
import axios from "axios";

interface AttendanceDisplayProps {
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

const AttendanceDisplay: FC<AttendanceDisplayProps> = ({ user }) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const storeData = async () => {
      //@ts-ignore
      user?.groups.forEach(async (group) => {
        const attendanceRes = await axios.post("/api/my-attendances", {
          groupId: group.id,
        });
        const data = [].concat(attendanceRes.data);
        setData((p) => [...p, ...data]);
      });
    };
    storeData();
  }, []);
  const dataSorted = data.sort((a: any, b: any) => {
    return Number(new Date(b.date)) - Number(new Date(a.date));
  });
  return (
    <div>
      <div className='w-full fixed bg-white border-b-2 h-14 p-4 flex items-center justify-start font-bold z-10'>
        <h1>
          {user?.name} {user?.lastname} {"  "} ({user?.role})
        </h1>
      </div>
      <div className='pt-[56px] '>
        <UpdatesList data={dataSorted} />
      </div>
    </div>
  );
};

export default AttendanceDisplay;
